import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalizedLegalTabs from "@/components/legal/localized-legal-tabs";
import {
  getSinglePrivacyPolicy,
  getPrivacyPolicies,
} from "@/lib/plank/fetch";
import { getPageMetadata } from "@/lib/metadata";
import PageContainer from "@/components/page-container";
import { getRouteLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const { data: policies } = await getPrivacyPolicies({ locale: "en" });

  return ["es", "en"].flatMap((locale) =>
    policies.map((policy) => ({ locale, slug: policy.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRouteLocale(params);
  const policy = await getSinglePrivacyPolicy(slug, { locale });

  if (!policy) {
    return getPageMetadata(locale, "Privacy", "/privacy");
  }

  return getPageMetadata(locale, policy.title, `/privacy/${slug}`);
}

export default async function PrivacyEntryPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getRouteLocale(params);
  const policy = await getSinglePrivacyPolicy(slug, { locale });

  if (!policy) {
    notFound();
  }

  return (
    <PageContainer>
      <LocalizedLegalTabs
        title={policy.title}
        page={policy}
        locale={locale}
      />
    </PageContainer>
  );
}
