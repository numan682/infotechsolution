import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

type Props = {
  eyebrow?: string;
  title: string;
  lede?: string;
  highlight?: string[];
  align?: "center" | "left";
  dark?: boolean;
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, lede, highlight, align = "center", dark = false, as = "h2" }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && (
        <Reveal y={16}>
          <p className={`eyebrow mb-4 ${dark ? "!text-sky-400" : ""}`}>{eyebrow}</p>
        </Reveal>
      )}
      <SplitText as={as} text={title} highlight={highlight} className={`display-lg ${dark ? "text-white" : "text-ink"}`} />
      {lede && (
        <Reveal delay={0.15}>
          <p className={`lede mt-6 ${center ? "mx-auto" : ""} max-w-2xl ${dark ? "!text-neutral-400" : ""}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
