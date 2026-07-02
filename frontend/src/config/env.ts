const rawBackendUrl = import.meta.env.VITE_BACKEND_URL?.trim();

const normalizeUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    return parsed.origin;
  } catch {
    return '';
  }
};

export const getBackendUrl = (): string => {
  if (rawBackendUrl) {
    const normalized = normalizeUrl(rawBackendUrl);
    if (normalized) return normalized;
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return '';
};
