import type { Lang } from "@/i18n/config";
import { getDict } from "@/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";

export const privacyMeta = (lang: Lang) => {
  const t = getDict(lang).pages.privacy;
  return pageMeta(lang, { title: t.metaTitle, description: t.metaDescription, path: "/privacy-policy/" });
};

export function PrivacyView({ lang }: { lang: Lang }) {
  const t = getDict(lang).pages.privacy;
  return (
    <>
      <PageHero lang={lang} eyebrow={t.eyebrow} title={t.title} lede={t.lede} crumbs={[{ name: t.title, path: "/privacy-policy/" }]} />
      <article className="container-x prose-apple max-w-3xl pb-28">
        <p>
          <em>{t.updated}</em>
        </p>
        <p>{t.intro}</p>
        {t.sections.map((sec) => (
          <section key={sec.h}>
            <h2>{sec.h}</h2>
            <ul>
              {sec.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
        <p>{t.noSell}</p>
        <h2>{t.retentionH}</h2>
        <p>{t.retention}</p>
        <h2>{t.rightsH}</h2>
        <p>
          {t.rights} <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <h2>{t.contactH}</h2>
        <p>
          {site.name}, {site.address.street}, {site.address.locality} {site.address.postalCode}, {site.address.country}. {site.phone}
        </p>
      </article>
    </>
  );
}
