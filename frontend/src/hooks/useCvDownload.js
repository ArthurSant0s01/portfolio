import { useState } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Triggers a download of the generated CV PDF from the backend.
export default function useCvDownload() {
  const [loading, setLoading] = useState(false);

  const download = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/cv`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Arthur_de_Oliveira_CV.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return { download, loading };
}
