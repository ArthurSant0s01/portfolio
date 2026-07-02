import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import "@/App.css";

import { I18nProvider } from "@/i18n/I18nContext";
import CustomCursor from "@/components/CustomCursor";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Photography from "@/pages/Photography";
import Videography from "@/pages/Videography";
import AI from "@/pages/AI";
import Resume from "@/pages/Resume";
import Contact from "@/pages/Contact";

function AnimatedRoutes() {
  const location = useLocation();
  return (
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
