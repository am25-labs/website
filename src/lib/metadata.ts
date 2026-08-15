import type { Metadata } from "next";
import { getCopy, type Locale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;

export const baseMetadata: Metadata = {
  title: "AM25 - Design & Web Studio",
  description: "We are an independent creative studio.",
  metadataBase: new URL(`${baseUrl}`),
  openGraph: {
    title: "AM25 - Design & Web Studio",
    description: "We are an independent creative studio.",
    url: baseUrl,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1920,
        height: 1080,
        alt: "AM25 - Design & Web Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AM25 - Design & Web Studio",
    description: "We are an independent creative studio.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export function getBaseMetadata(locale: Locale): Metadata {
  const copy = getCopy(locale);

  return {
    ...baseMetadata,
    title: copy.siteTitle,
    description: copy.siteDescription,
    openGraph: {
      ...baseMetadata.openGraph,
      title: copy.siteTitle,
      description: copy.siteDescription,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: copy.siteTitle,
      description: copy.siteDescription,
    },
  };
}

export function getPageMetadata(
  locale: Locale,
  title: string,
  path: string,
  description?: string,
): Metadata {
  const base = getBaseMetadata(locale);
  const pageDescription = description ?? base.description ?? undefined;

  return {
    ...base,
    title: `${title} - AM25`,
    description: pageDescription,
    openGraph: {
      ...base.openGraph,
      title: `${title} - AM25`,
      description: pageDescription,
      url: `${baseUrl}${path}`,
    },
    twitter: {
      ...base.twitter,
      title: `${title} - AM25`,
      description: pageDescription,
    },
  };
}
