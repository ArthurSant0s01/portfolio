const DEFAULT_BACKEND_URL =
  "https://react-vite-showcase-5.preview.emergentagent.com";

export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") || DEFAULT_BACKEND_URL;