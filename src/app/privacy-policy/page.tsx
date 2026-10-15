import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    `How ${site.name} collects, uses and protects your personal information.`,
  path: "/privacy-policy/",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lede="Your privacy matters to us. Here’s exactly what we collect and why."
        crumbs={[{ name: "Privacy Policy", href: "/privacy-policy/" }]}
      />
      <article className="container-x prose-apple max-w-3xl pb-28">
        <p>
          <em>Last updated: October 2026</em>
        </p>
        <p>
          This policy explains how {site.name} (“we”, “us”) handles information when you visit {site.domain} or contact us.
        </p>
        <h2>Information we collect</h2>
        <ul>
          <li>Details you submit through our contact form: name, email, phone, company and project information.</li>
          <li>Basic technical data your browser sends, such as IP address and browser type, recorded in standard server logs.</li>
        </ul>
        <h2>How we use it</h2>
        <ul>
          <li>To reply to your enquiry and provide quotes or services you request.</li>
          <li>To keep our website secure and prevent spam or abuse.</li>
        </ul>
        <p>We never sell your personal information. We do not use advertising cookies on this website.</p>
        <h2>Data retention</h2>
        <p>Enquiries are kept only as long as needed to respond and maintain our business records, then deleted.</p>
        <h2>Your rights</h2>
        <p>
          You can ask us to access, correct or delete your personal data at any time by emailing{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <h2>Contact</h2>
        <p>
          {site.name}, {site.address.street}, {site.address.locality} {site.address.postalCode}, {site.address.country}.
        </p>
      </article>
    </>
  );
}
