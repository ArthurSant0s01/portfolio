import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import "@/App.css";

import { I18nProvider } from "@/i18n/I18nContext";
import CustomCursor from "@/components/CustomCursor";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Projects = lazy(() => import("@/pages/Projects"));
const Photography = lazy(() => import("@/pages/Photography"));
const Videography = lazy(() => import("@/pages/Videography"));
const AI = lazy(() => import("@/pages/AI"));
const Resume = lazy(() => import("@/pages/Resume"));
const Contact = lazy(() => import("@/pages/Contact"));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p role="status" className="text-sm text-muted">Loading page...</p>
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/videography" element={<Videography />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          {/* Legacy PT paths → new paths */}
          <Route path="/sobre" element={<Navigate to="/about" replace />} />
          <Route path="/projetos" element={<Navigate to="/projects" replace />} />
          <Route path="/fotografia" element={<Navigate to="/photography" replace />} />
          <Route path="/videos" element={<Navigate to="/videography" replace />} />
          <Route path="/competencias" element={<Navigate to="/about" replace />} />
          <Route path="/contacto" element={<Navigate to="/contact" replace />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

function App() {
  return (
    <div className="App grain">
      <I18nProvider>
        <Background />
        <CustomCursor />
        <BrowserRouter>
          <Navbar />
          <main id="main-content">
            <AnimatedRoutes />
          </main>
          <Footer />
        </BrowserRouter>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(18,18,18,0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              backdropFilter: "blur(12px)",
            },
          }}
        />
      </I18nProvider>
    </div>
  );
}

export default App;
