import { lazy, Suspense } from "react";
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
const NotFound = lazy(() => import("@/pages/NotFound"));

function PageLoader() {
  return <div className="sr-only" aria-live="polite">Loading page content</div>;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<PageLoader />}>
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
          {/* Legacy PT paths -> new paths */}
          <Route path="/sobre" element={<Navigate to="/about" replace />} />
          <Route path="/projetos" element={<Navigate to="/projects" replace />} />
          <Route path="/fotografia" element={<Navigate to="/photography" replace />} />
          <Route path="/videos" element={<Navigate to="/videography" replace />} />
          <Route path="/competencias" element={<Navigate to="/about" replace />} />
          <Route path="/contacto" element={<Navigate to="/contact" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

function App() {
  return (
    <div className="App grain">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-black"
      >
        Skip to main content
      </a>
      <I18nProvider>
        <Background />
        <CustomCursor />
        <BrowserRouter>
          <Navbar />
          <AnimatedRoutes />
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
