export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";
export const localeCookie = "am25-locale";

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function dateLocale(locale: Locale) {
  return locale === "es" ? "es-SV" : "en-US";
}

export function pageTitle(title: string) {
  return `${title} - AM25`;
}

const copy = {
  en: {
    all: "All",
    featuredWork: "Featured work",
    ourBrand: "Our brand",
    recentEntries: "Recent entries",
    viewAll: "View all",
    whatWeDo: "What we do",
    studioFaqs: "Studio FAQs",
    backToWorks: "Back to works",
    backToNotes: "Back to all notes",
    whyItExists: "Why it exists",
    aboutUs: "About us",
    workCases: "Work / Cases",
    notes: "Notes",
    projectInquiries: "Project inquiries",
    generalInquiries: "General inquiries",
    ourBrandPage: "Our brand",
    privacy: "Privacy",
    terms: "Terms & conditions",
    copyright: "Copyright",
    publishedViaPlank: "Published via Plank CMS",
    poweredByPlank: "Powered by Plank CMS",
    siteTitle: "AM25 - Design & Web Studio",
    siteDescription: "We are an independent creative studio.",
  },
  es: {
    all: "Todo",
    featuredWork: "Trabajo destacado",
    ourBrand: "Nuestra marca",
    recentEntries: "Entradas recientes",
    viewAll: "Ver todas",
    whatWeDo: "Qué hacemos",
    studioFaqs: "Preguntas frecuentes",
    backToWorks: "Volver a trabajos",
    backToNotes: "Volver a todas las notas",
    whyItExists: "Por qué existe",
    aboutUs: "Sobre nosotros",
    workCases: "Trabajo / Casos",
    notes: "Notas",
    projectInquiries: "Consultas de proyectos",
    generalInquiries: "Consultas generales",
    ourBrandPage: "Nuestra marca",
    privacy: "Privacidad",
    terms: "Términos y condiciones",
    copyright: "Derechos de autor",
    publishedViaPlank: "Publicado con Plank CMS",
    poweredByPlank: "Impulsado por Plank CMS",
    siteTitle: "AM25 - Estudio de diseño y web",
    siteDescription: "Somos un estudio creativo independiente.",
  },
} as const;

export function getCopy(locale: Locale) {
  return copy[locale];
}
