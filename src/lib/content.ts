// Language-independent data. Text for each item lives in src/content/{en,bn}.ts.
import type { IconName } from "./services";

// Portfolio. Add an entry here plus its text (same id) in both language files.
export const projectMeta = [
  { id: "mobitrack-app", url: "https://v2.mobitrack24.com/app", gradient: ["#FF7A00", "#FFB443"] },
  { id: "mobitrack-server", url: "https://mobitrack24.com", gradient: ["#FF4D17", "#FF9A3D"] },
  { id: "suncity", url: "https://suncityengineering.com", gradient: ["#E85D00", "#FFC24B"] },
  { id: "inventory", url: undefined, gradient: ["#FF3D3D", "#FF8A00"] },
  { id: "language-app", url: undefined, gradient: ["#F97316", "#FFD08A"] },
] as const satisfies readonly { id: string; url?: string; gradient: readonly [string, string] }[];

export type ProjectId = (typeof projectMeta)[number]["id"];

export const processColors = ["#FF7A00", "#FF5A00", "#EF4A00", "#D63F00"] as const;

export const valueIcons: IconName[] = ["rocket", "users", "shield", "headphones"];

export const techStack = [
  "Next.js", "React", "TypeScript", "Flutter", "React Native", "Laravel", "Node.js", "Python",
  "AWS", "Google Cloud", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Figma", "Shopify",
  "WordPress", "Tailwind CSS", "Firebase", "Cloudflare",
] as const;
