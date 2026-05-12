export type Social = {
  label: string;
  handle: string;
  href: string;
};

export type Profile = {
  name: string;
  initials: string;
  handle: string;
  role: string;
  company: string;
  location: string;
  tagline: string;
  about: string[];
  email: string;
  phone: string;
  available: boolean;
  socials: Social[];
  stats: { k: string; v: string }[];
};

export type Skill = { name: string; cat: string; level: number };

export type Service = {
  id: number;
  title: string;
  icon: string;
  desc: string;
  bullets: string[];
};

export type ExperienceItem = {
  role: string;
  org: string;
  from: string;
  to: string;
  desc: string;
  tags: string[];
};

export type EducationItem = {
  title: string;
  org: string;
  from: string;
  to: string;
  grade: string;
  desc: string;
};

export type Certificate = { title: string; org: string; year: string };

export type Project = {
  slug: string;
  title: string;
  cat: string;
  featured: boolean;
  short: string;
  full: string;
  tech: string[];
  year: string;
  live: string;
  repo: string;
  role: string;
  duration: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  cat: string;
  date: string;
  read: string;
  tags: string[];
  excerpt: string;
  featured: boolean;
};

export const PROFILE: Profile = {
  name: "Mahfuz Ahmed Zisan",
  initials: "MAZ",
  handle: "maz.",
  role: "Software Developer",
  company: "Maktech",
  location: "Dinajpur, Bangladesh",
  tagline:
    "Software developer building modern web apps with Laravel, React, and Next.js.",
  about: [
    "I'm a software developer focused on shipping reliable, well-crafted web products. My day-to-day stack is Laravel on the backend with React and Next.js on the front — I care about clean code, fast pages, and interfaces that feel obvious to use.",
    "Outside of client work I read about LLMs, vibe-code small experiments, and grind ranked games. I'm here to keep growing as an engineer and to take on hard, interesting problems.",
  ],
  email: "hello@mahfuz.dev",
  phone: "+880 1XXX-XXXXXX",
  available: true,
  socials: [
    {
      label: "GitHub",
      handle: "@mahfuzahmedzisan",
      href: "https://github.com/mahfuzahmedzisan",
    },
    {
      label: "Facebook",
      handle: "@mahfuzahmedzisan",
      href: "https://facebook.com/mahfuzahmedzisan",
    },
    { label: "Twitter", handle: "—", href: "#" },
    { label: "LinkedIn", handle: "—", href: "#" },
    { label: "YouTube", handle: "—", href: "#" },
  ],
  stats: [
    { k: "Years coding", v: "4+" },
    { k: "Shipped projects", v: "30+" },
    { k: "Happy clients", v: "12" },
    { k: "Coffee / day", v: "∞" },
  ],
};

export const SKILLS: Skill[] = [
  { name: "PHP", cat: "Backend", level: 92 },
  { name: "Laravel", cat: "Backend", level: 95 },
  { name: "MySQL", cat: "Backend", level: 88 },
  { name: "PostgreSQL", cat: "Backend", level: 80 },
  { name: "Python", cat: "Backend", level: 55 },
  { name: "JavaScript", cat: "Frontend", level: 92 },
  { name: "React", cat: "Frontend", level: 90 },
  { name: "Next.js", cat: "Frontend", level: 88 },
  { name: "Tailwind CSS", cat: "Frontend", level: 94 },
  { name: "Bootstrap", cat: "Frontend", level: 85 },
  { name: "Docker", cat: "DevOps", level: 70 },
  { name: "VPS / Linux", cat: "DevOps", level: 78 },
  { name: "Git", cat: "DevOps", level: 90 },
  { name: "Figma", cat: "Design", level: 80 },
  { name: "Photoshop", cat: "Design", level: 75 },
  { name: "Illustrator", cat: "Design", level: 70 },
  { name: "Canva", cat: "Design", level: 88 },
  { name: "MS Office", cat: "Tools", level: 90 },
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Web Application Development",
    icon: "</>",
    desc: "Production-ready web apps in Laravel, React, and Next.js — built to scale, easy to maintain, and a joy to extend.",
    bullets: ["Custom dashboards & SaaS", "REST + GraphQL APIs", "Auth, roles, billing"],
  },
  {
    id: 2,
    title: "Backend & API Engineering",
    icon: "{}",
    desc: "Robust backends with Laravel and PHP. Clean architecture, queued jobs, secure auth, and well-documented APIs.",
    bullets: ["Laravel 11 / PHP 8.3", "Postgres + MySQL", "Redis, queues, cron"],
  },
  {
    id: 3,
    title: "Frontend with React & Next.js",
    icon: "▲",
    desc: "Fast, accessible, beautifully animated interfaces. Server components, SSR/ISR, and pixel-perfect UI.",
    bullets: ["App Router + RSC", "Tailwind + shadcn/ui", "Framer Motion"],
  },
  {
    id: 4,
    title: "DevOps & Deployment",
    icon: "≡",
    desc: "Ship confidently — Docker images, VPS provisioning, CI/CD, zero-downtime deploys, monitoring.",
    bullets: ["Docker & docker-compose", "Nginx / Caddy", "GitHub Actions"],
  },
  {
    id: 5,
    title: "UI Design & Branding",
    icon: "◇",
    desc: "Figma-first design with care for type, hierarchy, and brand. From a single landing page to a full design system.",
    bullets: ["Design systems", "Landing pages", "Logos & identity"],
  },
  {
    id: 6,
    title: "Maintenance & Support",
    icon: "⊕",
    desc: "Audits, bug fixes, performance work, and ongoing care for existing Laravel and Next.js codebases.",
    bullets: ["Code review", "Lighthouse 90+", "Security patches"],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Software Developer",
    org: "Maktech",
    from: "Feb 2025",
    to: "Present",
    desc: "Building production Laravel + Next.js applications for SMB and agency clients. Owning features end-to-end — schema, API, UI, deploy.",
    tags: ["Laravel", "Next.js", "PostgreSQL", "Docker"],
  },
  {
    role: "Freelance Developer",
    org: "Self-employed",
    from: "Jul 2023",
    to: "Jan 2025",
    desc: "Delivered websites, dashboards, and small SaaS tools for local businesses while studying. Learned to scope, ship, and support real users.",
    tags: ["Laravel", "React", "Tailwind", "MySQL"],
  },
  {
    role: "Web Development Intern",
    org: "Polytechnic Lab",
    from: "Jan 2023",
    to: "Jun 2023",
    desc: "First professional codebase — wrote PHP modules, fixed bugs, and learned Git, code review, and deployment under a senior team.",
    tags: ["PHP", "MySQL", "Bootstrap"],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    title: "Diploma in Computer Science",
    org: "Dinajpur Polytechnic Institute",
    from: "2020",
    to: "2024",
    grade: "CGPA 3.79 / 4.00",
    desc: "Four-year diploma covering programming, databases, networking, and software engineering. Graduated 2024.",
  },
  {
    title: "Secondary School Certificate (Science)",
    org: "Palashbari S.M. Pilot Govt. High School",
    from: "2018",
    to: "2020",
    grade: "GPA 4.39 / 5.00",
    desc: "Completed SSC in 2020 with science group focus.",
  },
];

export const CERTIFICATES: Certificate[] = [
  { title: "Laravel Advanced Patterns", org: "Self-paced", year: "2024" },
  { title: "Next.js App Router Deep Dive", org: "Frontend Masters", year: "2024" },
  { title: "Docker for Developers", org: "Online", year: "2023" },
];

export const CATEGORIES = [
  "All",
  "SaaS",
  "Dashboard",
  "E-commerce",
  "Marketing",
  "Tooling",
] as const;

export const PROJECTS: Project[] = [
  {
    slug: "ledgerly",
    title: "Ledgerly",
    cat: "SaaS",
    featured: true,
    short:
      "Multi-tenant accounting & invoicing for small businesses, with role-based teams and stripe billing.",
    full: "Ledgerly is a multi-tenant SaaS that gives small businesses a clean ledger, invoice flow, and recurring billing in one place. Built on Laravel 11 with a Next.js front-end, role-based teams, and Stripe + bKash integrations.",
    tech: ["Laravel", "Next.js", "PostgreSQL", "Stripe", "Tailwind"],
    year: "2025",
    live: "#",
    repo: "#",
    role: "Lead Developer",
    duration: "8 months",
  },
  {
    slug: "north-pulse",
    title: "North Pulse",
    cat: "Dashboard",
    featured: true,
    short:
      "Realtime ops dashboard for a logistics company — fleet, drivers, deliveries, all on one screen.",
    full: "Realtime ops console for a 90-vehicle logistics fleet. Live websockets, geofencing, daily route summaries, and driver scoring.",
    tech: ["Next.js", "Laravel", "MySQL", "WebSockets", "Mapbox"],
    year: "2025",
    live: "#",
    repo: "#",
    role: "Full-stack",
    duration: "5 months",
  },
  {
    slug: "marketplace-ke",
    title: "Marketplace KE",
    cat: "E-commerce",
    featured: true,
    short:
      "Multi-vendor marketplace with vendor onboarding, escrow checkout, and a content-rich storefront.",
    full: "Two-sided marketplace with vendor onboarding, escrow checkout, dispute flow, and SEO-optimized storefront.",
    tech: ["Laravel", "React", "PostgreSQL", "Redis", "Algolia"],
    year: "2024",
    live: "#",
    repo: "#",
    role: "Backend Lead",
    duration: "10 months",
  },
  {
    slug: "studyflow",
    title: "StudyFlow",
    cat: "SaaS",
    featured: false,
    short:
      "Pomodoro + spaced-repetition study app with Notion-style notes and study-group rooms.",
    full: "Productivity app for students. Pomodoro timers, spaced-repetition cards, Notion-style notes, and group rooms with audio.",
    tech: ["Next.js", "Laravel", "WebRTC", "Tailwind"],
    year: "2024",
    live: "#",
    repo: "#",
    role: "Solo",
    duration: "3 months",
  },
  {
    slug: "agency-os",
    title: "Agency OS",
    cat: "Tooling",
    featured: true,
    short:
      "Internal CRM + project tracker designed for a 12-person creative agency. Replaces Notion + Trello.",
    full: "Replaced Notion + Trello + spreadsheets for a 12-person creative agency. CRM, projects, time tracking, invoices.",
    tech: ["Laravel", "Next.js", "PostgreSQL", "Inertia"],
    year: "2024",
    live: "#",
    repo: "#",
    role: "Full-stack",
    duration: "6 months",
  },
  {
    slug: "lumen-store",
    title: "Lumen Store",
    cat: "E-commerce",
    featured: false,
    short:
      "Headless commerce storefront for a boutique lighting brand — fast, content-rich, and SEO-first.",
    full: "Headless commerce storefront for a boutique lighting brand. Saleor backend with a Next.js storefront tuned for SEO.",
    tech: ["Next.js", "Saleor", "Tailwind", "Vercel"],
    year: "2024",
    live: "#",
    repo: "#",
    role: "Frontend",
    duration: "2 months",
  },
  {
    slug: "atlas-blog",
    title: "Atlas Blog",
    cat: "Marketing",
    featured: false,
    short:
      "MDX-driven publication with on-the-fly OG images, full-text search, and newsletter integration.",
    full: "MDX-driven publication with on-the-fly OG images, full-text search, and Buttondown newsletter integration.",
    tech: ["Next.js", "MDX", "Algolia"],
    year: "2023",
    live: "#",
    repo: "#",
    role: "Solo",
    duration: "1 month",
  },
  {
    slug: "kite-pos",
    title: "Kite POS",
    cat: "Dashboard",
    featured: false,
    short:
      "Touch-optimized POS for cafés. Offline-first, sync queue, daily reports, kitchen tickets.",
    full: "Touch-optimized POS for cafés. Offline-first PWA, sync queue, daily reports, kitchen ticket printing.",
    tech: ["Laravel", "Vue", "MySQL", "Service Worker"],
    year: "2023",
    live: "#",
    repo: "#",
    role: "Solo",
    duration: "4 months",
  },
  {
    slug: "clinic-cloud",
    title: "Clinic Cloud",
    cat: "SaaS",
    featured: false,
    short:
      "EMR + appointment system for small clinics — patient records, billing, and SMS reminders.",
    full: "EMR + appointment system for small clinics. Patient records, billing, SMS reminders, prescription printing.",
    tech: ["Laravel", "Livewire", "MySQL"],
    year: "2023",
    live: "#",
    repo: "#",
    role: "Full-stack",
    duration: "5 months",
  },
  {
    slug: "trail-finder",
    title: "Trail Finder",
    cat: "Marketing",
    featured: false,
    short:
      "Interactive map directory of hiking trails with elevation profiles, photos, and weather.",
    full: "Map-driven directory of hiking trails with elevation profiles, photo galleries, and live weather.",
    tech: ["Next.js", "Mapbox", "Sanity"],
    year: "2023",
    live: "#",
    repo: "#",
    role: "Solo",
    duration: "2 months",
  },
  {
    slug: "scope-cli",
    title: "Scope CLI",
    cat: "Tooling",
    featured: false,
    short:
      "Tiny CLI to scaffold Laravel + Next.js monorepos with auth, queues, and CI baked in.",
    full: "Personal CLI for scaffolding Laravel + Next.js monorepos with auth, queues, Docker, and GitHub Actions baked in.",
    tech: ["Node.js", "TypeScript", "Bash"],
    year: "2024",
    live: "#",
    repo: "#",
    role: "Solo",
    duration: "ongoing",
  },
  {
    slug: "verse-llm",
    title: "Verse LLM Playground",
    cat: "Tooling",
    featured: false,
    short:
      "Side project: a notebook-style playground for prompting and benchmarking local LLMs.",
    full: "Notebook-style playground for prompting and benchmarking local LLMs. Saves runs, diff prompts, exports markdown.",
    tech: ["Next.js", "FastAPI", "SQLite"],
    year: "2025",
    live: "#",
    repo: "#",
    role: "Solo",
    duration: "ongoing",
  },
];

export const BLOG_CATEGORIES = [
  "All",
  "Laravel",
  "Next.js",
  "DevOps",
  "Career",
] as const;

export const BLOGS: BlogPost[] = [
  {
    slug: "laravel-11-action-classes",
    title: "Laravel 11 + action classes: a pattern that scales",
    cat: "Laravel",
    date: "Apr 14, 2026",
    read: "8 min",
    tags: ["Laravel", "Architecture"],
    excerpt:
      "Why I moved every controller in our codebase to single-action classes — and the small set of conventions that made it stick.",
    featured: true,
  },
  {
    slug: "next-app-router-real-app",
    title: "Next.js App Router after 12 months in production",
    cat: "Next.js",
    date: "Mar 02, 2026",
    read: "11 min",
    tags: ["Next.js", "RSC"],
    excerpt:
      "Honest notes from running a real SaaS on the App Router for a year — what stuck, what hurt, what I'd do differently.",
    featured: true,
  },
  {
    slug: "vps-zero-to-deploy",
    title: "From bare VPS to zero-downtime deploys in 30 minutes",
    cat: "DevOps",
    date: "Feb 09, 2026",
    read: "9 min",
    tags: ["Docker", "VPS"],
    excerpt:
      "A no-magic guide to provisioning a Hetzner box, hardening it, and getting Docker + Caddy + GitHub Actions wired up.",
    featured: false,
  },
  {
    slug: "skeleton-loaders-not-spinners",
    title: "Skeleton loaders, not spinners — a small UX upgrade",
    cat: "Next.js",
    date: "Jan 22, 2026",
    read: "5 min",
    tags: ["UX", "React"],
    excerpt:
      "Spinners say 'something is happening.' Skeletons say 'here's what is coming.' Why I switched, with patterns.",
    featured: false,
  },
  {
    slug: "junior-to-paid-dev",
    title: "From polytechnic student to paid developer",
    cat: "Career",
    date: "Dec 18, 2025",
    read: "7 min",
    tags: ["Career"],
    excerpt:
      "How I went from CS diploma student to a full-time developer role, and the projects that made the difference.",
    featured: false,
  },
  {
    slug: "tailwind-design-tokens",
    title: "Tailwind + design tokens: one source of truth",
    cat: "Next.js",
    date: "Nov 03, 2025",
    read: "6 min",
    tags: ["Tailwind", "Design"],
    excerpt:
      "Stop hardcoding colors. A small Tailwind config + CSS variable trick that lets the same theme power Figma and prod.",
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOGS.find((b) => b.slug === slug);
}
