// Static, non-translatable data (links, media config, route map).
export const profile = {
  firstName: "Arthur",
  fullName: "Arthur de Oliveira",
  email: "hello@arthuroliveira.dev",
  whatsapp: "351900000000",
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    instagram: "https://instagram.com/",
  },
};

export const mediaConfig = {
  sampleVideo: "",
};

// Route map — path + i18n key for the label.
export const navLinks = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "projects", path: "/projects" },
  { key: "photography", path: "/photography" },
  { key: "videography", path: "/videography" },
  { key: "ai", path: "/ai" },
  { key: "resume", path: "/resume" },
  { key: "contact", path: "/contact" },
];
