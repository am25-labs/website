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
  Category,
  Discipline,
} from "@/types/domain";
import type { Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

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
  locale?: Locale;
};

async function localeOf(locale?: Locale) {
  return locale ?? getLocale();
}

async function getCategories(locale: Locale) {
  return plank.collection<Category>("categories").findMany(
    { status: "published", locale, fallback: "en" },
    CACHE_GENERAL_OPTIONS,
  );
}

async function getDisciplines(locale: Locale) {
  return plank.collection<Discipline>("disciplines").findMany(
    { status: "published", locale, fallback: "en" },
    CACHE_GENERAL_OPTIONS,
  );
}

async function withCategories(notes: Note[], locale: Locale) {
  const { data: categories } = await getCategories(locale);
  const byId = new Map(categories.map((category) => [category.id, category]));

  return notes.map((note) => ({
    ...note,
    category: note.category ? (byId.get(note.category.id) ?? note.category) : null,
  }));
}

async function withDisciplines(works: Work[], locale: Locale) {
  const { data: disciplines } = await getDisciplines(locale);
  const byId = new Map(disciplines.map((discipline) => [discipline.id, discipline]));

  return works.map((work) => ({
    ...work,
    disciplines: work.disciplines.map(
      (discipline) => byId.get(discipline.id) ?? discipline,
    ),
  }));
}

const PREVIEW_FETCH_OPTIONS = { cache: "no-store" } as const;

// CT: Works
export async function getWorks({ onlyFeatured = false, locale }: { onlyFeatured?: boolean; locale?: Locale } = {}) {
  const activeLocale = await localeOf(locale);
  const result = await plank.collection<Work>("works").findMany(
    {
      status: "published",
      sort: "date",
      order: "desc",
      ...(onlyFeatured && { filters: { featured: { eq: true } } }),
      locale: activeLocale,
      fallback: "en",
    },
    CACHE_GENERAL_OPTIONS,
  );

  return { ...result, data: await withDisciplines(result.data, activeLocale) };
}

export async function getSingleWork(slug: string, { locale }: LocaleOptions = {}) {
  const activeLocale = await localeOf(locale);
  const result = await plank.collection<Work>("works").findMany(
    {
      status: "published",
      filters: { slug: { eq: slug } },
      locale: activeLocale,
      fallback: "en",
    },
    CACHE_GENERAL_OPTIONS,
  );
  const works = await withDisciplines(result.data, activeLocale);
  return works[0];
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
  const activeLocale = await localeOf(locale);
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

  return { ...result, data: await withCategories(result.data, activeLocale) };
}

export async function getSingleNote(
  slug: string,
  { locale }: LocaleOptions = {},
) {
  const activeLocale = await localeOf(locale);
  const result = await plank.collection<Note>("notes").findMany(
    {
      status: "published",
      filters: { slug: { eq: slug } },
      locale: activeLocale,
      fallback: "en",
    },
    CACHE_NOTES_OPTIONS,
  );
  const notes = await withCategories(result.data, activeLocale);
  return notes[0];
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
  const activeLocale = await localeOf(locale);
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
  const activeLocale = await localeOf(locale);
  return plank.single<Home>("home").find({ locale: activeLocale, fallback: "en" }, CACHE_GENERAL_OPTIONS);
}

// About
export async function getAbout({ locale }: LocaleOptions = {}): Promise<About> {
  const activeLocale = await localeOf(locale);
  return plank.single<About>("about").find({ locale: activeLocale, fallback: "en" }, CACHE_GENERAL_OPTIONS);
}

// Legals
export async function getPrivacy({ locale }: LocaleOptions = {}) {
  const activeLocale = await localeOf(locale);
  return plank
    .single<LegalPage>("privacy")
    .find(
      { locale: activeLocale, fallback: "en" },
      CACHE_GENERAL_OPTIONS,
    );
}

export async function getTerms({ locale }: LocaleOptions = {}) {
  const activeLocale = await localeOf(locale);
  return plank
    .single<LegalPage>("terms")
    .find(
      { locale: activeLocale, fallback: "en" },
      CACHE_GENERAL_OPTIONS,
    );
}

export async function getCopyright({ locale }: LocaleOptions = {}) {
  const activeLocale = await localeOf(locale);
  return plank
    .single<LegalPage>("copyright")
    .find(
      { locale: activeLocale, fallback: "en" },
      CACHE_GENERAL_OPTIONS,
    );
}

export async function getFooter({ locale }: LocaleOptions = {}) {
  const activeLocale = await localeOf(locale);
  return plank.single<Footer>("footer").find({ locale: activeLocale, fallback: "en" }, CACHE_GENERAL_OPTIONS);
}

// Content Hub
export async function getContentHub({ locale }: LocaleOptions = {}): Promise<ContentHub> {
  const activeLocale = await localeOf(locale);
  return plank
    .single<ContentHub>("content-hub")
    .find({ locale: activeLocale, fallback: "en" }, CACHE_GENERAL_OPTIONS);
}
