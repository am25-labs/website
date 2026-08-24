import plank from "./client";
import type {
  Navigation,
  Work,
  Note,
  Home,
  About,
  LegalPage,
  ContentHub,
  Footer,
} from "@/types/domain";
import type { Locale } from "@/lib/i18n";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

const TTL_GENERAL = 6 * HOUR;
const TTL_NOTES = 5 * MINUTE;

const CACHE_GENERAL_OPTIONS = {
  cache: "force-cache",
  revalidate: TTL_GENERAL / SECOND,
} as const;

const CACHE_NOTES_OPTIONS = {
  cache: "force-cache",
  revalidate: TTL_NOTES / SECOND,
} as const;

type LocaleOptions = { locale?: Locale };

const PREVIEW_FETCH_OPTIONS = { cache: "no-store" } as const;

// CT: Works
export async function getWorks({ onlyFeatured = false, locale }: { onlyFeatured?: boolean; locale?: Locale } = {}) {
  const activeLocale = locale ?? "es";
  const result = await plank.collection<Work>("works").findMany(
    {
      status: "published",
      sort: "date",
      order: "desc",
      ...(onlyFeatured && { filters: { featured: { eq: true } } }),
      exclude: "case_study",
      locale: activeLocale,
      fallback: "en",
    },
    CACHE_GENERAL_OPTIONS,
  );

  return result;
}

export async function getSingleWork(slug: string, { locale }: LocaleOptions = {}) {
  const activeLocale = locale ?? "es";
  const result = await plank.collection<Work>("works").findMany(
    {
      status: "published",
      filters: { slug: { eq: slug } },
      exclude: "case_study",
      locale: activeLocale,
      fallback: "en",
    },
    CACHE_GENERAL_OPTIONS,
  );
  return result.data[0];
}

export async function getPreviewWork(slug: string) {
  return plank.collection<Work>("works").findMany(
    {
      limit: 1,
      status: "all",
      filters: { slug: { eq: slug } },
      exclude: "case_study",
    },
    PREVIEW_FETCH_OPTIONS,
  );
}

// CT: Notes
export async function getNotes({ locale }: LocaleOptions = {}) {
  const activeLocale = locale ?? "es";
  const result = await plank.collection<Note>("notes").findMany(
    {
      status: "published",
      sort: "published_at",
      order: "desc",
      locale: activeLocale,
      fallback: "en",
    },
    CACHE_NOTES_OPTIONS,
  );

  return result;
}

export async function getSingleNote(
  slug: string,
  { locale }: LocaleOptions = {},
) {
  const activeLocale = locale ?? "es";
  const result = await plank.collection<Note>("notes").findMany(
    {
      status: "published",
      filters: { slug: { eq: slug } },
      locale: activeLocale,
      fallback: "en",
    },
    CACHE_NOTES_OPTIONS,
  );
  return result.data[0];
}

export async function getPreviewNote(
  slug: string,
  { locale }: LocaleOptions = {},
) {
  return plank.collection<Note>("notes").findMany(
    {
      limit: 1,
      status: "all",
      filters: { slug: { eq: slug } },
      ...(locale && { locale, fallback: "en" }),
    },
    PREVIEW_FETCH_OPTIONS,
  );
}

// ST: Navigation
async function getNavigation({ locale }: LocaleOptions = {}) {
  const activeLocale = locale ?? "es";
  return plank
    .single<Navigation>("navigation")
    .find({ locale: activeLocale, fallback: "en" }, CACHE_GENERAL_OPTIONS);
}

export async function getMainNav(options?: LocaleOptions) {
  const navigation = await getNavigation(options);
  return navigation.main_nav ?? [];
}

export async function getFooterNav(options?: LocaleOptions) {
  const navigation = await getNavigation(options);
  return navigation.footer_nav ?? [];
}

// Home
export async function getHome({ locale }: LocaleOptions = {}) {
  const activeLocale = locale ?? "es";
  return plank.single<Home>("home").find({ locale: activeLocale, fallback: "en" }, CACHE_GENERAL_OPTIONS);
}

// About
export async function getAbout({ locale }: LocaleOptions = {}): Promise<About> {
  const activeLocale = locale ?? "es";
  return plank.single<About>("about").find({ locale: activeLocale, fallback: "en" }, CACHE_GENERAL_OPTIONS);
}

// Legals
export async function getPrivacy({ locale }: LocaleOptions = {}) {
  const activeLocale = locale ?? "es";
  return plank
    .single<LegalPage>("privacy")
    .find(
      { locale: activeLocale, fallback: "en" },
      CACHE_GENERAL_OPTIONS,
    );
}

export async function getTerms({ locale }: LocaleOptions = {}) {
  const activeLocale = locale ?? "es";
  return plank
    .single<LegalPage>("terms")
    .find(
      { locale: activeLocale, fallback: "en" },
      CACHE_GENERAL_OPTIONS,
    );
}

export async function getCopyright({ locale }: LocaleOptions = {}) {
  const activeLocale = locale ?? "es";
  return plank
    .single<LegalPage>("copyright")
    .find(
      { locale: activeLocale, fallback: "en" },
      CACHE_GENERAL_OPTIONS,
    );
}

export async function getFooter({ locale }: LocaleOptions = {}) {
  const activeLocale = locale ?? "es";
  return plank.single<Footer>("footer").find({ locale: activeLocale, fallback: "en" }, CACHE_GENERAL_OPTIONS);
}

// Content Hub
export async function getContentHub({ locale }: LocaleOptions = {}): Promise<ContentHub> {
  const activeLocale = locale ?? "es";
  return plank
    .single<ContentHub>("content-hub")
    .find({ locale: activeLocale, fallback: "en" }, CACHE_GENERAL_OPTIONS);
}
