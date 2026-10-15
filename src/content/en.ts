// English copy for the whole site. src/content/bn.ts must mirror this shape.
// Tokens like {name} are filled at render time with `fill()`.

const en = {
  meta: {
    siteTitle: "InfoTech Solution | IT Company & Digital Agency in Bangladesh",
    description:
      "InfoTech Solution is a Bangladesh-based IT company and digital agency building fast websites, mobile apps, custom software, GPS tracking platforms, cloud infrastructure and growth-focused digital marketing.",
    keywords: [
      "IT company in Bangladesh",
      "software company Dhaka",
      "web development Bangladesh",
      "mobile app development Bangladesh",
      "GPS tracking software Bangladesh",
      "digital agency Bangladesh",
      "SEO company Bangladesh",
      "custom software development",
      "InfoTech Solution",
    ],
    ogAlt: "InfoTech Solution: IT Company & Digital Agency in Bangladesh",
  },

  nav: {
    labels: { "/services/": "Services", "/work/": "Work", "/about/": "About", "/process/": "Process", "/contact/": "Contact" } as Record<string, string>,
    home: "Home",
    cta: "Start a project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skip: "Skip to content",
    servicesMenuTitle: "What we build",
    servicesMenuAll: "View all services",
    servicesMenuPromoTitle: "Not sure where to start?",
    servicesMenuPromoBody: "Book a free consultation and get a clear roadmap within 24 hours.",
    language: "Language",
  },

  common: {
    learnMore: "Learn more",
    getQuote: "Get a free quote",
    allProjects: "All projects",
    visitSite: "Visit site",
    newTab: "opens in new tab",
    callUs: "Call {phone}",
    whatsapp: "Chat on WhatsApp",
    email: "Email",
    phone: "Phone",
    whatsappLabel: "WhatsApp",
    whatsappValue: "Chat with us instantly",
    office: "Office",
    hoursLabel: "Working hours",
    hours: "Sat – Thu, 9:00 AM – 7:00 PM (GMT+6)",
    breadcrumb: "Breadcrumb",
  },

  hero: {
    badgeNew: "New",
    badge: "AI & automation services now live",
    title: "Technology, engineered to move you.",
    highlight: ["move", "you."],
    lede: "InfoTech Solution is a Bangladesh-based IT company and digital agency. We design and build websites, apps and software that look stunning, load instantly and grow your business.",
    primary: "Start your project",
    secondary: "See our work",
    chips: [
      { label: "Core Web Vitals", value: "100" },
      { label: "Live tracking", value: "24/7" },
      { label: "Launch", value: "On time" },
    ],
  },

  marquee: "Built with world-class technology",

  statement: {
    eyebrow: "Who we are",
    srTitle: "About InfoTech Solution",
    text: "We’re designers, engineers and strategists from Dhaka, building digital products that are fast, beautiful and made to grow. From first sketch to millions of users, we sweat every detail so your customers never have to think twice.",
  },

  servicesSection: {
    eyebrow: "What we do",
    title: "Everything you need to win online.",
    highlight: ["win", "online."],
    lede: "One partner for strategy, design, engineering and growth. Pick a single service or let us run your entire digital stack.",
  },

  impact: { eyebrow: "Our impact", line1: "From Dhaka", line2: "to the world." },
  stats: ["Projects shipped", "Happy clients", "Countries served", "Client retention"],

  process: {
    eyebrow: "How we work",
    title: "A process built for zero surprises.",
    highlight: ["zero", "surprises."],
    lede: "Four clear stages, weekly demos and one dedicated team. You always know what’s happening and what’s next.",
    steps: [
      {
        title: "Discover",
        body: "We dig into your goals, users and competitors through workshops and research, then turn it all into a clear, prioritised roadmap.",
        points: ["Stakeholder workshops", "User & market research", "Scope, timeline & fixed quote"],
      },
      {
        title: "Design",
        body: "Wireframes become pixel-perfect, interactive prototypes. You click through your product before a single line of code is written.",
        points: ["User flows & wireframes", "High-fidelity UI", "Clickable prototype"],
      },
      {
        title: "Develop",
        body: "Agile two-week sprints with a live demo at the end of each. Clean, tested, documented code you can see progress on every day.",
        points: ["2-week agile sprints", "Code reviews & QA", "Staging link from week one"],
      },
      {
        title: "Launch & grow",
        body: "We ship, monitor and optimise. Then we stay on as your long-term tech partner, improving performance, SEO and features.",
        points: ["Zero-downtime launch", "Analytics & monitoring", "Ongoing support & growth"],
      },
    ],
  },

  work: {
    eyebrow: "Selected work",
    title: "Built to perform.",
    moreTitle: "+ more",
    moreBody: "Many more websites, apps and systems shipped. Yours could be next.",
    moreCta: "Start a project",
    pageMoreBody: "And many more websites, apps and systems. Some are private, so ask us for relevant case studies.",
    pageMoreCta: "Talk to us",
  },

  why: {
    eyebrow: "Why InfoTech",
    title: "World-class quality. Bangladesh value.",
    highlight: ["World-class", "quality."],
    lede: "Senior talent, modern tooling and global standards, at a price that makes sense. That’s why ambitious teams choose us and stay.",
    values: [
      { title: "Speed with craft", body: "We move fast without cutting corners. Every release is reviewed, tested and polished." },
      { title: "Radically transparent", body: "Shared boards, weekly demos and honest timelines. No surprises, ever." },
      { title: "Secure by default", body: "Security reviews, encrypted data and best practices on every project." },
      { title: "Real partnership", body: "A dedicated team that knows your product and answers when you call." },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions? Answered.",
    highlight: ["Answered."],
    lede: "Everything you need to know before we start building together.",
    cta: "Still curious? Talk to us →",
    items: [
      {
        q: "What does InfoTech Solution do?",
        a: "We are a full-service IT company and digital agency based in Dhaka, Bangladesh. We build websites, mobile apps, custom software, ERP and GPS tracking systems, and help businesses grow with cloud, SEO, digital marketing and AI automation.",
      },
      {
        q: "Do you work with international clients?",
        a: "Yes. We work with clients across Bangladesh and abroad, with overlapping working hours and communication in English and Bangla.",
      },
      {
        q: "How much does a website or app cost?",
        a: "Every project is different. After a free discovery call we provide a fixed, itemised quote. Business websites start from an affordable entry package, while apps and custom software are scoped by features.",
      },
      {
        q: "How do you keep projects on time and on budget?",
        a: "Clear scope, fixed milestones, two-week sprints with live demos and a dedicated project manager. You always know exactly what is being built and when.",
      },
      {
        q: "Will I own the code and designs?",
        a: "Yes. On final payment, full intellectual property, including source code, design files and documentation, is transferred to you.",
      },
      {
        q: "Do you offer support after launch?",
        a: "Every project includes a free support period, and we offer flexible monthly maintenance and growth plans afterwards.",
      },
    ],
  },

  cta: {
    title: "Have an idea? Let’s build it together.",
    highlight: ["build", "it"],
    lede: "Tell us about your project and get a free consultation, a clear roadmap and a fixed quote within 24 hours.",
    primary: "Get a free quote",
    serviceTitle: "Ready to start your {service} project?",
    workTitle: "Your project could be next.",
    aboutTitle: "Let’s build something remarkable.",
  },

  footer: {
    blurb: "A Bangladesh-based IT company and digital agency crafting software, apps and growth for ambitious brands.",
    services: "Services",
    company: "Company",
    contact: "Get in touch",
    privacy: "Privacy Policy",
    rights: "All rights reserved.",
    madeIn: "Designed & engineered in Dhaka, Bangladesh",
    socialOn: "{name} on {network}",
  },

  services: {
    "web-development": {
      title: "Web Development",
      short: "Lightning-fast websites and web apps built with Next.js, React and Laravel.",
      headline: "Websites that load in a blink. And convert.",
      summary:
        "From marketing sites to complex SaaS platforms, we engineer web experiences that score 95+ on Core Web Vitals, rank on Google and turn visitors into customers. Every build is responsive, accessible and secure by default.",
      keywords: ["web development company in Bangladesh", "Next.js development", "React developers Dhaka", "Laravel development"],
      features: [
        { title: "Performance first", body: "Static generation, edge caching and image optimisation for sub-second loads on 4G." },
        { title: "SEO baked in", body: "Semantic HTML, structured data, sitemaps and metadata configured from day one." },
        { title: "Scales with you", body: "Clean, typed, tested code that your team can extend without fear." },
        { title: "CMS that’s a joy", body: "Headless CMS or WordPress so your team can publish without a developer." },
      ],
      deliverables: ["Corporate & marketing websites", "SaaS dashboards & portals", "Progressive Web Apps (PWA)", "Headless CMS & WordPress", "API development & integration", "Website maintenance & care plans"],
      faqs: [
        { q: "How long does a business website take?", a: "A typical 5–10 page business website takes 2–4 weeks from kickoff to launch. Larger web applications are planned in 2-week sprints with a working demo at the end of every sprint." },
        { q: "Will my website work on shared hosting?", a: "Yes. We can deliver fully static sites that run on any cPanel shared host, or deploy to modern cloud platforms when you need server-side features." },
        { q: "Do you provide maintenance after launch?", a: "Every project includes free post-launch support, and we offer monthly care plans covering updates, backups, security monitoring and small changes." },
      ],
    },
    "mobile-app-development": {
      title: "Mobile App Development",
      short: "Native-quality iOS & Android apps with Flutter and React Native.",
      headline: "One codebase. Every pocket.",
      summary:
        "We design and build mobile apps people actually keep on their home screen. Cross-platform with Flutter or React Native, or fully native when performance demands it, with App Store and Play Store launch handled end-to-end.",
      keywords: ["mobile app development Bangladesh", "Flutter app developers", "React Native agency", "iOS Android app company Dhaka"],
      features: [
        { title: "Cross-platform speed", body: "Ship to iOS and Android together from a single codebase." },
        { title: "Buttery 60fps UI", body: "Native gestures, haptics and fluid animation that feel at home on every device." },
        { title: "Offline-ready", body: "Local storage and smart sync so your app works even when the network doesn’t." },
        { title: "Store launch handled", body: "Listings, screenshots, review guidelines and release management, all done for you." },
      ],
      deliverables: ["iOS & Android apps", "Flutter & React Native", "bKash, Nagad & SSLCommerz payments", "Push notifications & analytics", "Admin panels & backends", "App Store optimisation (ASO)"],
      faqs: [
        { q: "Flutter or React Native: which is better?", a: "Both are excellent. We recommend based on your team, existing code and feature set. Flutter shines for pixel-perfect custom UI; React Native is great when you already have a React web team." },
        { q: "Can you integrate local payment gateways?", a: "Yes. We regularly integrate bKash, Nagad, Rocket, SSLCommerz, aamarPay, Stripe and PayPal." },
        { q: "Do you publish the app to the stores?", a: "Yes. We prepare the listings, handle review submissions and manage releases on both the Apple App Store and Google Play." },
      ],
    },
    "ui-ux-design": {
      title: "UI/UX Design",
      short: "Research-driven product design, design systems and prototypes.",
      headline: "Design that feels inevitable.",
      summary:
        "Great products feel obvious. We get there through user research, rapid prototyping and relentless iteration, delivering interfaces that are beautiful, accessible and engineered for conversion.",
      keywords: ["UI UX design agency Bangladesh", "product design", "Figma design system", "app design Dhaka"],
      features: [
        { title: "Research-led", body: "Interviews, analytics and usability tests guide every pixel we push." },
        { title: "Design systems", body: "Reusable components in Figma that keep your brand consistent at scale." },
        { title: "Clickable prototypes", body: "Validate ideas with real users before a single line of code is written." },
        { title: "Accessible by default", body: "WCAG 2.2 AA contrast, sizing and interaction patterns built in." },
      ],
      deliverables: ["UX research & audits", "Wireframes & user flows", "High-fidelity UI design", "Interactive prototypes", "Design systems in Figma", "Brand identity & logo design"],
      faqs: [
        { q: "Do I get the source design files?", a: "Always. You own every Figma file, component library and asset we create for you." },
        { q: "Can you redesign an existing product?", a: "Yes. We start with a UX audit to find what’s working and what isn’t, then redesign in phases so your users are never disrupted." },
      ],
    },
    "custom-software": {
      title: "Custom Software & ERP",
      short: "ERP, CRM, inventory, POS and business automation tailored to how you work.",
      headline: "Software shaped around your business.",
      summary:
        "Off-the-shelf tools force you to bend. We build ERP, CRM, inventory, HR & payroll, POS and workflow systems that fit your processes exactly and grow with your company.",
      keywords: ["custom software development Bangladesh", "ERP software company Dhaka", "inventory software Bangladesh", "POS software Bangladesh"],
      features: [
        { title: "Built for your workflow", body: "We map your processes first, then build software that fits them, not the other way round." },
        { title: "Role-based security", body: "Granular permissions, audit logs and encrypted data for peace of mind." },
        { title: "Connected", body: "Integrates with accounting, payment, SMS and courier services you already use." },
        { title: "Reports that matter", body: "Real-time dashboards so decisions are made on data, not guesswork." },
      ],
      deliverables: ["ERP & inventory systems", "CRM & sales pipelines", "HR, payroll & attendance", "POS & retail management", "GPS & fleet tracking platforms", "Business process automation"],
      faqs: [
        { q: "Is custom software expensive?", a: "It’s an investment that typically pays back through saved hours and fewer errors. We scope an MVP first so you see value early and grow features over time." },
        { q: "Who owns the source code?", a: "You do. Full source code and documentation are handed over on completion." },
      ],
    },
    ecommerce: {
      title: "E-commerce Solutions",
      short: "Online stores on Shopify, WooCommerce or fully custom stacks.",
      headline: "Stores that sell while you sleep.",
      summary:
        "We build conversion-optimised online stores with local and international payments, courier integration and inventory sync, so you can focus on products, not plumbing.",
      keywords: ["e-commerce website Bangladesh", "Shopify developer", "WooCommerce agency Dhaka", "online store development"],
      features: [
        { title: "Checkout that converts", body: "Frictionless one-page checkout, guest buying and saved carts." },
        { title: "Local payments", body: "bKash, Nagad, SSLCommerz, cash on delivery and international cards." },
        { title: "Courier integration", body: "Automatic order push to Pathao, Steadfast, RedX and more." },
        { title: "Growth ready", body: "Facebook Pixel, Conversions API, GA4 and feed integrations configured." },
      ],
      deliverables: ["Shopify & WooCommerce stores", "Custom headless commerce", "Multi-vendor marketplaces", "Payment & courier integration", "Product feeds & catalog sync", "Conversion rate optimisation"],
      faqs: [
        { q: "Which platform should I choose?", a: "Shopify is fastest to launch, WooCommerce gives flexibility on a budget, and custom headless stacks are ideal for high-volume or unique business models. We’ll recommend the right fit." },
        { q: "Can you migrate my existing store?", a: "Yes. We migrate products, customers and orders with redirects in place so you keep your SEO rankings." },
      ],
    },
    "cloud-devops": {
      title: "Cloud & DevOps",
      short: "AWS, Azure & GCP architecture, CI/CD and 24/7 reliability.",
      headline: "Infrastructure you never have to think about.",
      summary:
        "We design secure, auto-scaling cloud infrastructure and automate everything from testing to deployment. Fewer outages, faster releases and lower monthly bills.",
      keywords: ["cloud services Bangladesh", "DevOps consulting", "AWS Dhaka", "server management"],
      features: [
        { title: "Cost optimised", body: "Right-sized resources and reserved capacity to cut wasted cloud spend." },
        { title: "Automated delivery", body: "CI/CD pipelines that test and ship code safely, many times a day." },
        { title: "Observability", body: "Logging, metrics and alerting so issues are fixed before customers notice." },
        { title: "Secure by design", body: "Least-privilege access, encrypted backups and hardened servers." },
      ],
      deliverables: ["Cloud architecture & migration", "CI/CD pipelines", "Docker & Kubernetes", "Server & cPanel management", "Backup & disaster recovery", "Monitoring & incident response"],
      faqs: [
        { q: "Can you move us from shared hosting to the cloud?", a: "Yes, with zero-downtime migration planning, DNS cutover and rollback plans in place." },
        { q: "Do you offer ongoing server management?", a: "Yes. Our managed plans include patching, monitoring, backups and on-call support." },
      ],
    },
    "seo-digital-marketing": {
      title: "SEO & Digital Marketing",
      short: "Rank higher, get found and grow with data-driven campaigns.",
      headline: "Be the answer people are searching for.",
      summary:
        "Technical SEO, content and paid media working together. We grow organic traffic, generate qualified leads and report on the numbers that actually move your revenue.",
      keywords: ["SEO company in Bangladesh", "digital marketing agency Dhaka", "Facebook ads expert", "Google Ads management"],
      features: [
        { title: "Technical SEO", body: "Site speed, crawlability, schema and Core Web Vitals fixed at the root." },
        { title: "Content that ranks", body: "Keyword research and expert content in English and Bangla that earns links and trust." },
        { title: "Paid media", body: "Google, Meta and LinkedIn campaigns optimised for cost per acquisition." },
        { title: "Transparent reporting", body: "Live dashboards with traffic, leads and ROI. No vanity metrics." },
      ],
      deliverables: ["Technical & on-page SEO", "Local SEO & Google Business Profile", "Content strategy & copywriting", "Google & Meta Ads", "Social media management", "Analytics & conversion tracking"],
      faqs: [
        { q: "How long does SEO take to show results?", a: "Most sites see measurable movement in 8–12 weeks, with compounding results over 6–12 months. Technical fixes can show impact much sooner." },
        { q: "Do you guarantee #1 rankings?", a: "No honest agency can. We guarantee transparent work, best practices and clear reporting." },
      ],
    },
    "ai-automation": {
      title: "AI & Automation",
      short: "Chatbots, AI integrations and workflow automation that save hours.",
      headline: "Put your busywork on autopilot.",
      summary:
        "We integrate large language models, smart chatbots and automation into your products and operations, answering customers instantly, processing documents and connecting your tools so your team can focus on work that matters.",
      keywords: ["AI development Bangladesh", "chatbot development", "business automation", "AI integration agency"],
      features: [
        { title: "AI assistants", body: "Customer support and sales chatbots trained on your own knowledge base." },
        { title: "Document intelligence", body: "Extract data from invoices, forms and PDFs automatically." },
        { title: "Workflow automation", body: "Connect CRM, email, sheets and messaging so tasks run themselves." },
        { title: "Responsible AI", body: "Privacy-aware design, guardrails and human review where it counts." },
      ],
      deliverables: ["AI chatbots for web & WhatsApp", "LLM integrations & RAG search", "Document & data extraction", "Zapier, Make & n8n automation", "Predictive analytics", "AI strategy workshops"],
      faqs: [
        { q: "Is my data safe with AI tools?", a: "We design with privacy first: data minimisation, provider agreements that exclude training on your data, and self-hosted options where required." },
        { q: "Can AI answer customers in Bangla?", a: "Yes. Modern language models handle Bangla and English well, and we tune responses to your brand voice." },
      ],
    },
  } as Record<string, ServiceText>,

  projects: {
    "mobitrack-app": {
      title: "MobiTrack24 App",
      category: "Mobile · GPS Tracking",
      blurb: "Android & iPhone app for live vehicle tracking, trip history and instant alerts.",
      highlight: "Android & iOS",
      tags: ["Live tracking", "Trip history", "Instant alerts"],
    },
    "mobitrack-server": {
      title: "MobiTrack24 GPS Tracking Server",
      category: "Platform · IoT",
      blurb: "Tracking platform behind MobiTrack GPS, a BTRC-approved vehicle tracking service for bikes, cars and fleets.",
      highlight: "BTRC approved",
      tags: ["Real-time GPS", "Engine lock", "Fleet management"],
    },
    suncity: {
      title: "Sun City Engineering",
      category: "Corporate · Website",
      blurb: "Website for a Bangladeshi supplier of genuine OEM parts, Weichai engines, XCMG wheel loaders and heavy machinery servicing.",
      highlight: "Live website",
      tags: ["Product catalog", "SEO", "Responsive"],
    },
    inventory: {
      title: "Inventory Management Software",
      category: "Business · Software",
      blurb: "Custom inventory system for stock control, purchases, sales and real-time reporting across locations.",
      highlight: "Custom-built",
      tags: ["Stock control", "Purchases & sales", "Reports"],
    },
    "language-app": {
      title: "Language Learning App",
      category: "EdTech · Mobile",
      blurb: "Mobile app with interactive lessons, quizzes and progress tracking that makes learning a new language fun.",
      highlight: "Learn on the go",
      tags: ["Lessons", "Quizzes", "Progress tracking"],
    },
  } as Record<string, ProjectText>,

  pages: {
    services: {
      metaTitle: "IT Services in Bangladesh: Web, App, Software & SEO",
      metaDescription:
        "Web development, mobile apps, UI/UX design, custom software & ERP, e-commerce, cloud & DevOps, SEO and AI automation from InfoTech Solution, an IT company in Dhaka, Bangladesh.",
      eyebrow: "Services",
      title: "Every service your business needs to grow.",
      highlight: ["grow."],
      lede: "Strategy, design, engineering and marketing under one roof, delivered by a senior team in Dhaka.",
      explore: "Explore {service}",
    },
    serviceDetail: {
      metaTitle: "{service} Company in Bangladesh",
      whyEyebrow: "Why it works",
      whyTitle: "{service}, done right.",
      deliverablesEyebrow: "What you get",
      deliverablesTitle: "Deliverables, end to end.",
      toolkit: "Our toolkit",
      processEyebrow: "Our process",
      processTitle: "From idea to impact in four steps.",
      faqEyebrow: "FAQ",
      faqTitle: "{service} questions.",
      more: "Explore more services",
    },
    work: {
      metaTitle: "Our Work: GPS Tracking, Apps, Websites & Software",
      metaDescription:
        "Projects by InfoTech Solution: the MobiTrack24 GPS tracking app and server, the Sun City Engineering website, inventory software, a language learning app and more, built in Bangladesh.",
      eyebrow: "Our work",
      title: "Products people love to use.",
      highlight: ["love"],
      lede: "GPS tracking platforms, mobile apps, business software and websites, designed, engineered and launched by our team in Dhaka.",
    },
    about: {
      metaTitle: "About Us: A Bangladesh IT Company Built on Craft",
      metaDescription:
        "Meet InfoTech Solution, a Dhaka-based team of designers, engineers and strategists building world-class websites, apps and software for clients in Bangladesh and worldwide.",
      eyebrow: "About us",
      title: "Made in Bangladesh. Built for the world.",
      highlight: ["Built", "for", "the", "world."],
      lede: "Since {year}, InfoTech Solution has helped startups, SMEs and enterprises turn ambitious ideas into digital products people love.",
      missionEyebrow: "Our mission",
      mission:
        "To make world-class technology accessible to every business, by pairing Bangladesh’s brilliant engineering talent with global standards of design, quality and care.",
      journeyEyebrow: "Our journey",
      journeyTitle: "A few chapters so far.",
      // TODO: update the milestones with your real company history.
      timeline: [
        { year: "2018", title: "Founded in Dhaka", body: "Started as a small web studio with a big belief: Bangladeshi talent can build world-class software." },
        { year: "2020", title: "Going mobile", body: "Launched our mobile practice, shipping Flutter and React Native apps to both app stores." },
        { year: "2022", title: "Tracking & IoT", body: "Built the MobiTrack24 GPS tracking platform and companion mobile app." },
        { year: "2024", title: "Cloud & growth", body: "Added cloud, DevOps and performance-marketing teams to support products after launch." },
        { year: "2026", title: "AI-first", body: "Bringing AI assistants and automation into every product we build." },
      ],
      peopleEyebrow: "Our people",
      peopleTitle: "One team. Four crafts.",
      peopleHighlight: ["Four", "crafts."],
      teams: [
        { name: "Design", body: "Product, UI/UX and brand designers obsessed with detail." },
        { name: "Engineering", body: "Full-stack, mobile and cloud engineers who ship clean, tested code." },
        { name: "Growth", body: "SEO, content and paid-media specialists focused on ROI." },
        { name: "Delivery", body: "Project managers and QA who keep everything on time and on budget." },
      ],
      valuesEyebrow: "What we value",
      valuesTitle: "Principles we never compromise.",
    },
    process: {
      metaTitle: "Our Process & Engagement Models",
      metaDescription:
        "How InfoTech Solution delivers software projects on time and on budget: discovery, design, agile development and launch, with fixed-price, dedicated team and retainer options.",
      eyebrow: "Process",
      title: "Clarity at every step.",
      highlight: ["Clarity"],
      lede: "A proven delivery process, transparent communication and flexible ways to work together, so you always know what you’re getting.",
      modelsEyebrow: "Engagement models",
      modelsTitle: "Work with us your way.",
      modelsHighlight: ["your", "way."],
      modelsLede: "Whether you need a single project delivered or a long-term product team, there’s a model that fits.",
      popular: "Most popular",
      discuss: "Discuss this model",
      models: [
        { title: "Fixed project", body: "Clear scope, fixed price and milestone-based payments. Ideal for websites, MVPs and well-defined builds.", points: ["Itemised quote", "Milestone payments", "Free support period"] },
        { title: "Dedicated team", body: "Your own remote squad of designers, developers and QA working only on your product, managed by us.", points: ["Full-time engineers", "Scale up or down monthly", "Daily stand-ups"] },
        { title: "Retainer & growth", body: "Monthly hours for maintenance, SEO, marketing and continuous improvements to live products.", points: ["Priority response", "Monthly reporting", "Roll-over hours"] },
      ],
    },
    contact: {
      metaTitle: "Contact Us: Get a Free Quote",
      metaDescription:
        "Talk to InfoTech Solution about your website, app or software project. Call +88 09666-722622 or visit us at Shahadat Shoroni, Dhaka 1212. Free consultation and a fixed quote within 24 hours.",
      eyebrow: "Contact",
      title: "Let’s talk about your next big thing.",
      highlight: ["next", "big", "thing."],
      lede: "Share a few details and we’ll come back with ideas, a timeline and a fixed quote, usually within 24 hours.",
    },
    privacy: {
      metaTitle: "Privacy Policy",
      metaDescription: "How InfoTech Solution collects, uses and protects your personal information.",
      eyebrow: "Legal",
      title: "Privacy Policy",
      lede: "Your privacy matters to us. Here’s exactly what we collect and why.",
      updated: "Last updated: October 2026",
      intro: "This policy explains how InfoTech Solution (“we”, “us”) handles information when you visit infotechsolution.site or contact us.",
      sections: [
        { h: "Information we collect", items: ["Details you send us by email, phone or the contact form: name, email, phone, company and project information.", "Basic technical data your browser sends, such as IP address and browser type, recorded in standard server logs."] },
        { h: "How we use it", items: ["To reply to your enquiry and provide quotes or services you request.", "To keep our website secure and prevent spam or abuse."] },
      ],
      noSell: "We never sell your personal information. We do not use advertising cookies on this website.",
      retentionH: "Data retention",
      retention: "Enquiries are kept only as long as needed to respond and maintain our business records, then deleted.",
      rightsH: "Your rights",
      rights: "You can ask us to access, correct or delete your personal data at any time by emailing",
      contactH: "Contact",
    },
    notFound: {
      title: "This page took a wrong turn.",
      body: "The page you’re looking for doesn’t exist or has moved.",
      back: "Back to home",
    },
  },

  form: {
    name: "Your name",
    email: "Email address",
    phone: "Phone",
    company: "Company",
    service: "What can we help with?",
    other: "Something else",
    budget: "Estimated budget",
    budgets: ["< ৳1 lakh", "৳1–5 lakh", "৳5–15 lakh", "৳15 lakh+", "Not sure yet"],
    message: "Tell us about your project",
    submit: "Send via email",
    note: "This opens your email app with your message ready to send.",
    required: "Please fill in your name, email and a short message.",
    sentTitle: "Your email is ready.",
    sentBody: "Your email app should have opened with your message. Just press send. If nothing opened, email us directly at",
    again: "Edit message",
    subject: "Project enquiry from {name}",
    bodyLabels: { name: "Name", email: "Email", phone: "Phone", company: "Company", service: "Service", budget: "Budget" },
  },
};

export type ServiceText = {
  title: string;
  short: string;
  headline: string;
  summary: string;
  keywords: string[];
  features: { title: string; body: string }[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
};

export type ProjectText = { title: string; category: string; blurb: string; highlight: string; tags: string[] };

export type Dict = typeof en;
export default en;
