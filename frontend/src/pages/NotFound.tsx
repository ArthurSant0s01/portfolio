import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";
import { Page } from "../components/Primitives";
import { SEO_BRAND_TITLE, SEO_DESCRIPTION } from "../lib/seo";

export default function NotFound() {
  return (
    <Page>
      <SEO
        title={SEO_BRAND_TITLE}
        description={SEO_DESCRIPTION}
        path="/404"
        noIndex
      />

      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-24 text-center">
        <div className="glass rounded-3xl p-10 sm:p-16">
          <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-br from-brand-blue/30 to-brand-purple/30 border border-white/10">
            <AlertTriangle size={30} className="text-brand-cyan" aria-hidden />
          </div>
          <h1 className="mt-8 text-4xl sm:text-6xl font-black tracking-tighter">Page not found</h1>
          <p className="mt-4 text-muted max-w-xl mx-auto leading-relaxed">
            The requested page does not exist or may have moved. Use the navigation or return to the homepage.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 btn-glow text-white font-medium px-7 py-3.5 rounded-full"
          >
            <ArrowLeft size={18} aria-hidden />
            Back to Home
          </Link>
        </div>
      </section>
    </Page>
  );
}
