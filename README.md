# InfoTech Solution — infotechsolution.site

Bilingual (English + বাংলা) static Next.js 16 site for InfoTech Solution, an IT company and digital agency in Dhaka, Bangladesh.
Built with Tailwind CSS v4, Motion (scroll and entrance animations) and Lenis (smooth scroll).

- English lives at `/`, Bangla at `/bn/`. Every page has both versions, linked with `hreflang` for SEO.
- The header's **EN | বাং** switch jumps to the same page in the other language.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000  (Bangla: /bn/)
```

## Build & deploy to cPanel (shared hosting)

```bash
npm run build      # outputs the static site to ./out
```

1. Open cPanel → **File Manager** → `public_html`.
2. Upload **the contents** of `out/` (not the folder itself), including the hidden `.htaccess`.
   Tip: zip the contents of `out/`, upload the zip, then use **Extract**.
3. Turn on SSL (cPanel → **SSL/TLS Status** → AutoSSL). `.htaccess` forces HTTPS and redirects `www` to the bare domain.
4. Verify the site in [Google Search Console](https://search.google.com/search-console) and
   [Bing Webmaster Tools](https://www.bing.com/webmasters): paste their meta-tag codes into
   `verification` in `src/lib/site.ts`, rebuild and re-upload, then submit `https://infotechsolution.site/sitemap.xml`.
5. Create a [Google Business Profile](https://business.google.com) with the same name, address and phone as the site
   (it drives "IT company near me" / Google Maps results).

`npm run build` starts from a clean cache (`prebuild`) and finishes with `scripts/postbuild.mjs`, which fixes
Next.js prefetch filenames when you build on Windows.

The contact form needs no server: it opens the visitor's email app with a pre-filled message to the address in `src/lib/site.ts`.

## Edit content

| What | File |
| --- | --- |
| Phone, email, address, WhatsApp, socials, stat numbers | `src/lib/site.ts` |
| All English text (pages, services, projects, FAQ, form) | `src/content/en.ts` |
| All Bangla text (same structure) | `src/content/bn.ts` |
| Service icons, colours, tech stacks | `src/lib/services.ts` |
| Portfolio links and colours | `src/lib/content.ts` |

To add a project: add an entry to `projectMeta` in `src/lib/content.ts`, then its text under the same id in both
`en.ts` and `bn.ts`. Services work the same way with `serviceMeta` and the `services` section of each language file.

> Before launch: confirm the stat numbers and company timeline, check the social profile links, and add a WhatsApp
> number if you want WhatsApp buttons (they stay hidden until set). Look for `TODO` comments.

## Performance

- Lighthouse (local, gzip): desktop 99–100, mobile 85–95 performance; 100 accessibility, best practices and SEO.
- Above-the-fold entrance animations are pure CSS, so the largest paint happens on the first frame.
- Motion's animation engine loads lazily; smooth scrolling (Lenis) loads only on mouse/trackpad devices.
- CSS is inlined; English pages load one 29KB font. Bangla pages add a self-hosted Anek Bangla
  (`public/fonts`, two static weights, ~56KB each).

## SEO

Each page in each language has its own title, description and canonical URL, `hreflang` alternates, Open Graph and
Twitter cards and a generated social image. JSON-LD covers Organization/ProfessionalService, WebSite, Service,
FAQPage and BreadcrumbList. The build generates `sitemap.xml` (with language alternates), `robots.txt` and a web manifest.
