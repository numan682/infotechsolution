import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/contact.php"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
