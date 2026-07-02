// Central portfolio content — edit here to update the whole site.
// Media (images / videos) can be swapped by replacing the URLs below without touching layout.

export const profile = {
  name: "Arthur de Oliveira dos Santos",
  firstName: "Arthur",
  role: "Creative Developer • Videographer • Photographer • AI Enthusiast",
  roles: ["Creative Developer", "Videographer", "Photographer", "AI Enthusiast"],
  slogan:
    "Transforming ideas into modern digital experiences through web development, video production and artificial intelligence.",
  about:
    "I'm an 18-year-old creative professional based in Portugal, passionate about technology, web development, photography, video editing and artificial intelligence. I enjoy building modern digital experiences that combine creativity, performance and innovation. I'm constantly learning new technologies and improving my skills to deliver high-quality work.",
  location: "Portugal",
  age: 18,
  email: "hello@arthuroliveira.dev",
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    instagram: "https://instagram.com/",
  },
  languages: [
    { name: "Portuguese", level: "Native", percent: 100 },
    { name: "English", level: "Intermediate", percent: 65 },
  ],
};

export const mediaConfig = {
  // No stock media — hero uses an animated gradient mesh.
  // Add your own showreel URL here when ready (used by the Videos lightbox).
  sampleVideo: "",
};

export const stats = [
  { label: "Years creating", value: 4, suffix: "+" },
  { label: "Projects delivered", value: 25, suffix: "+" },
  { label: "Photos captured", value: 5000, suffix: "+" },
  { label: "Videos edited", value: 120, suffix: "+" },
];

export const services = [
  {
    title: "Web Development",
    description: "Fast, modern and responsive websites built with React, Vite & Tailwind.",
    icon: "Code2",
  },
  {
    title: "Video Editing",
    description: "Cinematic edits with Premiere Pro, DaVinci Resolve and CapCut.",
    icon: "Clapperboard",
  },
  {
    title: "Photography",
    description: "Moody, story-driven photography with pro retouching in Lightroom.",
    icon: "Camera",
  },
  {
    title: "Social Media Content",
    description: "Scroll-stopping content crafted for reach and engagement.",
    icon: "Share2",
  },
  {
    title: "AI Solutions",
    description: "Intelligent automations and applications powered by modern AI.",
    icon: "Sparkles",
  },
  {
    title: "Landing Pages",
    description: "High-converting landing pages with premium design and motion.",
    icon: "LayoutTemplate",
  },
];

export const skills = [
  {
    category: "Web Development",
    items: [
      { name: "React", level: 92 },
      { name: "Vite", level: 88 },
      { name: "TypeScript", level: 80 },
      { name: "JavaScript", level: 90 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 88 },
      { name: "Vercel", level: 85 },
      { name: "Supabase", level: 80 },
    ],
  },
  {
    category: "Creative",
    items: [
      { name: "Video Editing", level: 90 },
      { name: "Photography", level: 88 },
      { name: "Adobe Premiere Pro", level: 85 },
      { name: "DaVinci Resolve", level: 80 },
      { name: "CapCut", level: 88 },
      { name: "Photoshop", level: 82 },
      { name: "Lightroom", level: 85 },
    ],
  },
  {
    category: "Artificial Intelligence",
    items: [
      { name: "Artificial Intelligence", level: 82 },
      { name: "Prompt Engineering", level: 88 },
    ],
  },
];

export const experience = [
  {
    year: "2025 — Now",
    title: "Freelance Creative Developer",
    org: "Self-employed",
    description:
      "Building web experiences, editing videos and shooting photography for local businesses and personal brands.",
  },
  {
    year: "2024",
    title: "SSDoces — E-commerce Launch",
    org: "Client Project",
    description:
      "Designed and developed a full e-commerce platform with cart, checkout and admin dashboard.",
  },
  {
    year: "2023",
    title: "Video & Photography Focus",
    org: "Personal Growth",
    description:
      "Deep-dived into cinematic editing and photography, mastering Premiere Pro, DaVinci Resolve and Lightroom.",
  },
  {
    year: "2022",
    title: "Started Web Development",
    org: "Self-taught",
    description:
      "Began learning HTML, CSS and JavaScript, then moved into the React ecosystem.",
  },
];

export const projects = [
  {
    title: "SSDoces",
    category: "Web Development",
    description:
      "Modern e-commerce website for a local confectionery business, with a smooth shopping experience end to end.",
    tech: ["React", "Vite", "Supabase", "Vercel"],
    features: [
      "Shopping cart",
      "Checkout",
      "Responsive Design",
      "Admin Dashboard",
      "Email Notifications",
    ],
    status: "Completed",
    icon: "ShoppingBag",
    from: "#3B82F6",
    to: "#06B6D4",
    link: "#",
    featured: true,
  },
  {
    title: "Portfolio Website",
    category: "Web Development",
    description:
      "Professional portfolio showcasing creative work, photography, video editing and web development.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    features: ["Premium Design", "Animations", "SEO Optimized", "Responsive"],
    status: "Completed",
    icon: "LayoutTemplate",
    from: "#8B5CF6",
    to: "#3B82F6",
    link: "#",
    featured: true,
  },
  {
    title: "Future AI Projects",
    category: "Artificial Intelligence",
    description:
      "A space prepared to showcase AI automations and intelligent applications — coming soon.",
    tech: ["AI", "Prompt Engineering", "Automation"],
    features: ["Automations", "Intelligent Apps", "Coming Soon"],
    status: "In Progress",
    icon: "Sparkles",
    from: "#06B6D4",
    to: "#8B5CF6",
    link: "#",
    featured: true,
  },
];

// Ready to grow: add entries as { title, category, thumbnail?, videoUrl? }.
// While empty, the Videos page shows an elegant "coming soon" state automatically.
export const videos = [];

// Ready to grow: add entries as { title, category, image? }.
// While empty, the Photography page shows an elegant "coming soon" state automatically.
export const photos = [];

export const testimonials = [
  // Prepared for future clients — add entries here as { name, role, quote, avatar }.
];

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Sobre", path: "/sobre" },
  { label: "Projetos", path: "/projetos" },
  { label: "Vídeos", path: "/videos" },
  { label: "Fotografia", path: "/fotografia" },
  { label: "Competências", path: "/competencias" },
  { label: "Contacto", path: "/contacto" },
];
