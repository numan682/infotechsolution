import {
  Bot,
  Cloud,
  CodeXml,
  Cpu,
  Gauge,
  Headphones,
  Layers,
  Lock,
  Palette,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  TrendingUp,
  Users,
  Workflow,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/lib/services";

const map = {
  code: CodeXml,
  smartphone: Smartphone,
  palette: Palette,
  cpu: Cpu,
  shopping: ShoppingBag,
  cloud: Cloud,
  trending: TrendingUp,
  bot: Bot,
  shield: ShieldCheck,
  rocket: Rocket,
  search: Search,
  pen: PenTool,
  layers: Layers,
  users: Users,
  gauge: Gauge,
  lock: Lock,
  workflow: Workflow,
  headphones: Headphones,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name];
  return <Cmp aria-hidden strokeWidth={1.75} {...props} />;
}
