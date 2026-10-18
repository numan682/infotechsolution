// Central business details (language-independent). Edit once; every page,
// the footer, structured data (JSON-LD) and the sitemap update automatically.
// TODO: confirm social profile URLs and add a WhatsApp number.

export const site = {
  name: "InfoTech Solution",
  shortName: "InfoTech",
  domain: "infotechsolution.site",
  url: "https://infotechsolution.site",
  email: "hello@infotechsolution.site",
  phone: "+88 09666-722622",
  phoneHref: "+8809666722622",
  // WhatsApp number in international format without "+" (e.g. "8801XXXXXXXXX").
  // Leave empty to hide all WhatsApp buttons.
  whatsapp: "" as string,
  address: {
    street: "174/1, Shahadat Shoroni",
    locality: "Dhaka",
    region: "Dhaka Division",
    postalCode: "1212",
    country: "Bangladesh",
    countryCode: "BD",
  },
  foundingYear: 2018,
  // Paste the verification codes from Google Search Console / Bing Webmaster Tools
  // (just the content="…" value of their HTML meta tag). Empty = tag not rendered.
  verification: { google: "", bing: "" },
  socials: {
    facebook: "https://www.facebook.com/infotechsolution.site",
    linkedin: "https://www.linkedin.com/company/infotechsolution-site",
    x: "https://x.com/infotechsol",
    github: "https://github.com/infotechsolution",
  },
} as const;

export const navPaths = ["/services/", "/work/", "/about/", "/process/", "/contact/"] as const;

// TODO: replace with your real numbers before launch. Labels live in src/content.
export const statValues = [
  { value: 250, suffix: "+" },
  { value: 120, suffix: "+" },
  { value: 12, suffix: "" },
  { value: 98, suffix: "%" },
] as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.locality} ${site.address.postalCode}, ${site.address.country}`,
)}`;
