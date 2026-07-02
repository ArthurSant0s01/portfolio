"""Backend API tests for Arthur portfolio."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://react-vite-showcase-5.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# GET /api/
def test_root(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert "running" in r.json().get("message", "").lower()


# POST /api/contact - success
def test_contact_create_and_persist(api):
    payload = {
        "name": "TEST_User",
        "email": "test_user@example.com",
        "subject": "TEST_Subject",
        "message": "TEST_Message body"
    }
    r = api.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["status"] == "success"
    assert isinstance(data["id"], str) and len(data["id"]) > 0
    assert data["email_sent"] is False

    # Verify persisted
    r2 = api.get(f"{BASE_URL}/api/contact/messages")
    assert r2.status_code == 200
    msgs = r2.json()
    assert any(m["id"] == data["id"] and m["email"] == payload["email"] for m in msgs)


# POST /api/contact - full payload with new fields
def test_contact_full_payload(api):
    payload = {
        "name": "TEST_FullUser",
        "email": "test_full@example.com",
        "company": "TEST_Acme",
        "country": "Portugal",
        "service": "Web Development",
        "budget": "1000-5000",
        "message": "TEST_Full message body"
    }
    r = api.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["status"] == "success"
    assert data["email_sent"] is False
    new_id = data["id"]

    r2 = api.get(f"{BASE_URL}/api/contact/messages")
    assert r2.status_code == 200
    msgs = r2.json()
    match = next((m for m in msgs if m["id"] == new_id), None)
    assert match is not None
    assert match["company"] == payload["company"]
    assert match["country"] == payload["country"]
    assert match["service"] == payload["service"]
    assert match["budget"] == payload["budget"]


# POST /api/contact - invalid email
def test_contact_invalid_email(api):
    r = api.post(f"{BASE_URL}/api/contact", json={
        "name": "x", "email": "not-an-email", "subject": "s", "message": "m"
    })
    assert r.status_code == 422


# POST /api/contact - missing fields
def test_contact_missing_email(api):
    r = api.post(f"{BASE_URL}/api/contact", json={"name": "x", "message": "m"})
    assert r.status_code == 422


# GET /api/cv
def test_cv_pdf_default(api):
    r = api.get(f"{BASE_URL}/api/cv")
    assert r.status_code == 200
    assert r.headers.get("content-type", "").startswith("application/pdf")
    assert r.content[:4] == b"%PDF"
    assert len(r.content) > 1000


@pytest.mark.parametrize("lang", ["en", "pt"])
def test_cv_pdf_lang(api, lang):
    r = api.get(f"{BASE_URL}/api/cv", params={"lang": lang})
    assert r.status_code == 200
    assert r.headers.get("content-type", "").startswith("application/pdf")
    assert r.content[:4] == b"%PDF"
    assert len(r.content) > 1000
