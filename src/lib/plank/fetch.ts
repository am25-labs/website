import plank from "./client";
import type {
  Navigation,
  Work,
  Note,
  Home,
  About,
  LegalPage,
  Footer,
} from "@/types/domain";

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

type LocaleOptions = {
  locale?: string;
};

const PREVIEW_FETCH_OPTIONS = { cache: "no-store" } as const;

// CT: Works
export async function getWorks({ onlyFeatured = false } = {}) {
  return plank.collection<Work>("works").findMany(
    {
      status: "published",
      sort: "date",
      order: "desc",
      ...(onlyFeatured && { filters: { featured: { eq: true } } }),
    },
    CACHE_GENERAL_OPTIONS,
  );
}

export async function getSingleWork(slug: string) {
  const result = await plank.collection<Work>("works").findMany(
    {
      status: "published",
      filters: { slug: { eq: slug } },
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
    },
    PREVIEW_FETCH_OPTIONS,
  );
}

// CT: Notes
export async function getNotes({ locale }: LocaleOptions = {}) {
  return plank.collection<Note>("notes").findMany(
    {
      status: "published",
      sort: "published_at",
      order: "desc",
      ...(locale && { locale, fallback: "en" }),
    },
    CACHE_NOTES_OPTIONS,
  );
}

export async function getSingleNote(
  slug: string,
  { locale }: LocaleOptions = {},
) {
  const result = await plank.collection<Note>("notes").findMany(
    {
      status: "published",
      filters: { slug: { eq: slug } },
      ...(locale && { locale, fallback: "en" }),
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
async function getNavigation() {
  return plank.single<Navigation>("navigation").find(
    undefined,
    CACHE_GENERAL_OPTIONS,
  );
}

export async function getMainNav() {
  const navigation = await getNavigation();
  return navigation.main_nav ?? [];
}

export async function getFooterNav() {
  const navigation = await getNavigation();
  return navigation.footer_nav ?? [];
}

// Home
export async function getHome() {
  return plank.single<Home>("home").find(undefined, CACHE_GENERAL_OPTIONS);
}

// About
export async function getAbout(): Promise<About> {
  return plank.single<About>("about").find(undefined, CACHE_GENERAL_OPTIONS);
}

// Legals
export async function getPrivacy({ locale }: LocaleOptions = {}) {
  return plank
    .single<LegalPage>("privacy")
    .find(
      locale ? { locale, fallback: "en" } : undefined,
      CACHE_GENERAL_OPTIONS,
    );
}

export async function getTerms({ locale }: LocaleOptions = {}) {
  return plank.single<LegalPage>("terms").find(
    locale ? { locale, fallback: "en" } : undefined,
    CACHE_GENERAL_OPTIONS,
  );
}

export async function getCopyright({ locale }: LocaleOptions = {}) {
  return plank
    .single<LegalPage>("copyright")
    .find(
      locale ? { locale, fallback: "en" } : undefined,
      CACHE_GENERAL_OPTIONS,
    );
}

export async function getFooter() {
  return plank.single<Footer>("footer").find(undefined, CACHE_GENERAL_OPTIONS);
}
