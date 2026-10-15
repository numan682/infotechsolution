# InfoTech Solution — infotechsolution.site

Static Next.js 16 marketing site for InfoTech Solution, an IT company and digital agency in Bangladesh.
Built with Tailwind CSS v4, Motion (scroll and entrance animations) and Lenis (smooth scroll).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & deploy to cPanel (shared hosting)

```bash
npm run build      # outputs the static site to ./out
```

1. Open cPanel → **File Manager** → `public_html`.
2. Upload **the contents** of `out/` (not the folder itself), including the hidden `.htaccess`.
   Tip: zip the contents of `out/`, upload the zip, then use **Extract**.
3. In cPanel → **Email Accounts**, create `noreply@infotechsolution.site` so the contact form can send mail.
4. Turn on SSL (cPanel → **SSL/TLS Status** → AutoSSL). `.htaccess` forces HTTPS and redirects `www` to the bare domain.
5. Submit `https://infotechsolution.site/sitemap.xml` in Google Search Console.

`npm run build` also runs `scripts/postbuild.mjs`, which fixes Next.js prefetch filenames when you build on Windows.

## Edit content

| What | File |
| --- | --- |
| Company name, email, phone, WhatsApp, address, socials, stats | `src/lib/site.ts` |
| Services and their detail pages (one page per entry) | `src/lib/services.ts` |
| Portfolio projects, process steps, FAQ, tech stack, values | `src/lib/content.ts` |
| Company timeline | `src/app/about/page.tsx` |
| Contact form recipient | `public/contact.php` (`$TO_EMAIL`) |

> Before launch, replace the placeholder address, stats and timeline, and add a WhatsApp number (buttons stay hidden until set)
> They are marked with `TODO` comments.

## SEO

Each page has its own title, description and canonical URL, plus Open Graph and Twitter cards and a generated
social image. JSON-LD structured data covers Organization/ProfessionalService, WebSite, Service, FAQPage and
BreadcrumbList. The build also generates `sitemap.xml`, `robots.txt` and a web manifest.
