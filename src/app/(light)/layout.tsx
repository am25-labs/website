import PageShell from "@/components/PageShell";
import { defaultLocale } from "@/lib/i18n";

export default function LightLayout({ children }: { children: React.ReactNode }) {
  return <PageShell variant="light" locale={defaultLocale}>{children}</PageShell>;
}
