// Language-independent service data. Text lives in src/content/{en,bn}.ts keyed by slug.

export type IconName =
  | "code"
  | "smartphone"
  | "palette"
  | "cpu"
  | "shopping"
  | "cloud"
  | "trending"
  | "bot"
  | "shield"
  | "rocket"
  | "search"
  | "pen"
  | "layers"
  | "users"
  | "gauge"
  | "lock"
  | "workflow"
  | "headphones"
  | "map-pin"
  | "route"
  | "power"
  | "bell"
  | "fuel"
  | "history"
  | "chart"
  | "qr"
  | "scan"
  | "landmark"
  | "siren"
  | "badge"
  | "zap"
  | "receipt"
  | "clock"
  | "camera"
  | "wifi-off"
  | "battery"
  | "file"
  | "navigation"
  | "radar"
  | "satellite"
  | "truck"
  | "car"
  | "bike"
  | "bus"
  | "building"
  | "user-check"
  | "map"
  | "fingerprint"
  | "traffic"
  | "alert"
  | "message"
  | "smile"
  | "gavel"
  | "monitor"
  | "plug"
  | "activity"
  | "calendar"
  | "clipboard"
  | "locate"
  | "package"
  | "hard-hat"
  | "pill"
  | "cart"
  | "school"
  | "server"
  | "webhook"
  | "eye-off"
  | "headset";

export const serviceMeta = [
  { slug: "web-development", icon: "code", gradient: ["#FF7A00", "#FFB443"], stack: ["Next.js", "React", "TypeScript", "Laravel", "Node.js", "Tailwind CSS", "WordPress", "PostgreSQL"] },
  { slug: "mobile-app-development", icon: "smartphone", gradient: ["#FF4D17", "#FF9A3D"], stack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "Supabase", "Node.js", "GraphQL"] },
  { slug: "ui-ux-design", icon: "palette", gradient: ["#FF3D6E", "#FF8A3D"], stack: ["Figma", "FigJam", "Framer", "Adobe CC", "Spline", "Lottie", "Maze", "Hotjar"] },
  { slug: "custom-software", icon: "cpu", gradient: ["#E85D00", "#FFA62B"], stack: ["Laravel", "Node.js", ".NET", "React", "PostgreSQL", "MySQL", "Redis", "Docker"] },
  { slug: "ecommerce", icon: "shopping", gradient: ["#FF5A1F", "#FFC24B"], stack: ["Shopify", "WooCommerce", "Next.js", "Medusa", "Stripe", "SSLCommerz", "bKash API", "Meta CAPI"] },
  { slug: "cloud-devops", icon: "cloud", gradient: ["#F97316", "#FB923C"], stack: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Cloudflare"] },
  { slug: "seo-digital-marketing", icon: "trending", gradient: ["#FF6B00", "#FF3D3D"], stack: ["Search Console", "GA4", "Ahrefs", "Semrush", "Google Ads", "Meta Ads", "Looker Studio", "Tag Manager"] },
  { slug: "ai-automation", icon: "bot", gradient: ["#D94400", "#FF8A00"], stack: ["Claude", "OpenAI", "LangChain", "Python", "n8n", "Make", "Pinecone", "FastAPI"] },
] as const satisfies readonly { slug: string; icon: IconName; gradient: readonly [string, string]; stack: readonly string[] }[];

export type ServiceSlug = (typeof serviceMeta)[number]["slug"];
export const serviceSlugs = serviceMeta.map((s) => s.slug);
