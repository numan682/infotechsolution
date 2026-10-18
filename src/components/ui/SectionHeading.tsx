import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

type Props = {
  eyebrow?: string;
  title: string;
  lede?: string;
  highlight?: string[];
  align?: "center" | "left";
  /** "onColor" = white text for orange/dark backgrounds. */
  tone?: "default" | "onColor";
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, lede, highlight, align = "center", tone = "default", as = "h2" }: Props) {
  const center = align === "center";
  const onColor = tone === "onColor";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && (
        <Reveal y={16}>
          <p className={`eyebrow mb-4 ${onColor ? "!text-white/90" : ""}`}>{eyebrow}</p>
        </Reveal>
      )}
      <SplitText
        as={as}
        text={title}
        highlight={onColor ? [] : highlight}
        className={`display-lg ${onColor ? "text-white" : "text-ink"}`}
      />
      {lede && (
        <Reveal delay={0.15}>
          <p className={`lede mt-6 ${center ? "mx-auto" : ""} max-w-2xl ${onColor ? "!text-white/80" : ""}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
