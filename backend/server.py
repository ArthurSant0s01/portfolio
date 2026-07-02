from fastapi import FastAPI, APIRouter, HTTPException, Request, Header, status
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import io
import html
import asyncio
import logging
import secrets
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Deque
import uuid
from datetime import datetime, timezone
from collections import defaultdict, deque

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.pdfgen import canvas

import resend

ROOT_DIR = Path(__file__).parent
dotenv_path = ROOT_DIR / ".env"
if dotenv_path.exists():
    load_dotenv(dotenv_path)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
def _get_env(name: str, default: Optional[str] = None, *, required: bool = False) -> str:
    value = os.getenv(name, default)
    if required and (value is None or not str(value).strip()):
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value or ""


def _get_positive_int_env(name: str, default: int) -> int:
    raw = _get_env(name, str(default))
    try:
        parsed = int(raw)
        return parsed if parsed > 0 else default
    except ValueError:
        return default


mongo_url = _get_env("MONGO_URL", required=True)
client = AsyncIOMotorClient(mongo_url)
db = client[_get_env("DB_NAME", required=True)]

# Email config
RESEND_API_KEY = _get_env("RESEND_API_KEY", "")
SENDER_EMAIL = _get_env("SENDER_EMAIL", "onboarding@resend.dev")
OWNER_EMAIL = _get_env("OWNER_EMAIL", "")
CONTACT_ADMIN_TOKEN = _get_env("CONTACT_ADMIN_TOKEN", "")
CONTACT_RATE_LIMIT_WINDOW_SECONDS = _get_positive_int_env("CONTACT_RATE_LIMIT_WINDOW_SECONDS", 60)
CONTACT_RATE_LIMIT_MAX_REQUESTS = _get_positive_int_env("CONTACT_RATE_LIMIT_MAX_REQUESTS", 5)
_contact_rate_limiter: Dict[str, Deque[float]] = defaultdict(deque)
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str = ""
    message: str
    company: str = ""
    country: str = ""
    service: str = ""
    budget: str = ""


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str = ""
    message: str
    company: str = ""
    country: str = ""
    service: str = ""
    budget: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Portfolio API running"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


def _build_contact_email(payload: ContactCreate) -> str:
    name = html.escape(payload.name)
    email = html.escape(payload.email)
    subject = html.escape(payload.subject) if payload.subject else "(no subject)"
    message = html.escape(payload.message).replace("\n", "<br/>")
    company = html.escape(payload.company) or "-"
    country = html.escape(payload.country) or "-"
    service = html.escape(payload.service) or "-"
    budget = html.escape(payload.budget) or "-"
    return f"""
    <div style="font-family: Arial, sans-serif; background:#0A0A0A; padding:24px; color:#ffffff;">
      <table width="100%" style="max-width:600px; margin:auto; background:#121212; border-radius:12px; padding:24px;">
        <tr><td style="font-size:20px; font-weight:bold; color:#3B82F6;">New portfolio message</td></tr>
        <tr><td style="padding-top:12px; color:#A1A1AA;">From</td></tr>
        <tr><td style="font-size:16px;">{name} &lt;{email}&gt;</td></tr>
        <tr><td style="padding-top:12px; color:#A1A1AA;">Company / Country</td></tr>
        <tr><td style="font-size:15px;">{company} · {country}</td></tr>
        <tr><td style="padding-top:12px; color:#A1A1AA;">Service / Budget</td></tr>
        <tr><td style="font-size:15px;">{service} · {budget}</td></tr>
        <tr><td style="padding-top:12px; color:#A1A1AA;">Subject</td></tr>
        <tr><td style="font-size:16px;">{subject}</td></tr>
        <tr><td style="padding-top:12px; color:#A1A1AA;">Message</td></tr>
        <tr><td style="font-size:15px; line-height:1.6;">{message}</td></tr>
      </table>
    </div>
    """


@api_router.post("/contact")
async def create_contact(payload: ContactCreate, request: Request):
    client_ip = request.headers.get("x-forwarded-for", "").split(",")[0].strip()
    if not client_ip:
        client_ip = request.client.host if request.client else "unknown"
    now = datetime.now(timezone.utc).timestamp()
    window_start = now - CONTACT_RATE_LIMIT_WINDOW_SECONDS
    history = _contact_rate_limiter[client_ip]
    while history and history[0] < window_start:
        history.popleft()
    if not history and client_ip in _contact_rate_limiter:
        _contact_rate_limiter.pop(client_ip, None)
        history = _contact_rate_limiter[client_ip]
    if len(history) >= CONTACT_RATE_LIMIT_MAX_REQUESTS:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many contact requests. Please try again later.",
        )
    history.append(now)

    msg = ContactMessage(**payload.model_dump())
    await db.contact_messages.insert_one(msg.model_dump())

    email_sent = False
    if RESEND_API_KEY and OWNER_EMAIL:
        params = {
            "from": SENDER_EMAIL,
            "to": [OWNER_EMAIL],
            "reply_to": payload.email,
            "subject": f"Portfolio contact: {payload.subject or payload.name}",
            "html": _build_contact_email(payload),
        }
        try:
            await asyncio.to_thread(resend.Emails.send, params)
            email_sent = True
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")

    return {"status": "success", "id": msg.id, "email_sent": email_sent}


@api_router.get("/contact/messages", response_model=List[ContactMessage])
async def list_contact_messages(authorization: Optional[str] = Header(default=None)):
    if not CONTACT_ADMIN_TOKEN:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    token = authorization.replace("Bearer ", "", 1).strip()
    if not secrets.compare_digest(token, CONTACT_ADMIN_TOKEN):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


def _generate_cv_pdf(lang: str = "en") -> bytes:
    pt = lang == "pt"
    tr = {
        "role": "Creative Developer  |  Videographer  |  Photographer  |  AI Enthusiast",
        "loc": "Portugal   -   " + ("Português (Nativo), Inglês (Intermédio)" if pt else "Portuguese (Native), English (Intermediate)"),
        "profile": "Perfil" if pt else "Profile",
        "profile_lines": (
            [
                "Profissional criativo de 18 anos em Portugal, apaixonado por desenvolvimento",
                "web, fotografia, edição de vídeo e inteligência artificial. Crio experiências",
                "digitais modernas que combinam criatividade, desempenho e inovação.",
            ]
            if pt
            else [
                "18-year-old creative professional based in Portugal, passionate about web",
                "development, photography, video editing and artificial intelligence. Building",
                "modern digital experiences that combine creativity, performance and innovation.",
            ]
        ),
        "skills": "Competências" if pt else "Skills",
        "projects": "Projetos" if pt else "Projects",
        "services": "Serviços" if pt else "Services",
        "services_line": (
            "Desenvolvimento Web, Edição de Vídeo, Fotografia, Conteúdo, Soluções de IA, Landing Pages"
            if pt
            else "Web Development, Video Editing, Photography, Content, AI Solutions, Landing Pages"
        ),
    }
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=A4)
    w, h = A4
    c.setFillColor(colors.HexColor("#0A0A0A"))
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(colors.HexColor("#3B82F6"))
    c.rect(0, h - 55 * mm, w, 55 * mm, fill=1, stroke=0)
    c.setFillColor(colors.HexColor("#8B5CF6"))
    c.rect(0, h - 55 * mm, w, 3, fill=1, stroke=0)

    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 30)
    c.drawString(20 * mm, h - 28 * mm, "Arthur de Oliveira dos Santos")
    c.setFont("Helvetica", 13)
    c.drawString(20 * mm, h - 38 * mm, tr["role"])
    c.setFont("Helvetica", 10)
    c.drawString(20 * mm, h - 47 * mm, tr["loc"])

    y = h - 70 * mm

    def heading(text):
        nonlocal y
        c.setFillColor(colors.HexColor("#06B6D4"))
        c.setFont("Helvetica-Bold", 13)
        c.drawString(20 * mm, y, text)
        c.setStrokeColor(colors.HexColor("#3B82F6"))
        c.line(20 * mm, y - 2 * mm, w - 20 * mm, y - 2 * mm)
        y -= 9 * mm

    def line(text, bold=False, indent=0):
        nonlocal y
        c.setFillColor(colors.white if bold else colors.HexColor("#D4D4D8"))
        c.setFont("Helvetica-Bold" if bold else "Helvetica", 11 if bold else 10)
        c.drawString((20 + indent) * mm, y, text)
        y -= 6 * mm

    heading(tr["profile"])
    for t in tr["profile_lines"]:
        line(t)
    y -= 4 * mm

    heading(tr["skills"])
    for t in [
        "Web: React, Vite, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS",
        "Tools: Git, GitHub, Vercel, Supabase",
        "Creative: Premiere Pro, DaVinci Resolve, CapCut, Photoshop, Lightroom",
        "AI: Artificial Intelligence, Prompt Engineering, Automation",
    ]:
        line(t)
    y -= 4 * mm

    heading(tr["projects"])
    line("SSDoces", bold=True)
    line("E-commerce - React, Vite, Supabase, Vercel.", indent=4)
    line("Portfolio Website", bold=True)
    line("Premium multilingual portfolio - React, Framer Motion.", indent=4)
    line("Future AI Projects", bold=True)
    line("AI automations and intelligent applications.", indent=4)
    y -= 4 * mm

    heading(tr["services"])
    line(tr["services_line"])

    c.showPage()
    c.save()
    buf.seek(0)
    return buf.read()


@api_router.get("/cv")
async def download_cv(lang: str = "en"):
    lang = "pt" if lang == "pt" else "en"
    pdf = _generate_cv_pdf(lang)
    fname = f"Arthur_de_Oliveira_{'CV_PT' if lang == 'pt' else 'Resume_EN'}.pdf"
    return StreamingResponse(
        io.BytesIO(pdf),
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={fname}"},
    )


app.include_router(api_router)

cors_origins = [origin.strip() for origin in _get_env("CORS_ORIGINS", "").split(",") if origin.strip()]
if not cors_origins:
    cors_origins = ["http://localhost:3000", "http://localhost:5173"]
allow_all_origins = "*" in cors_origins

app.add_middleware(
    CORSMiddleware,
    allow_credentials=not allow_all_origins,
    allow_origins=cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
