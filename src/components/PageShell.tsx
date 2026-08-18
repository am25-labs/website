import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Locale } from "@/lib/i18n";

type Variant = "default" | "yellow" | "light";

interface PageShellProps {
  children: React.ReactNode;
  variant?: Variant;
  locale: Locale;
}

export default function PageShell({
  children,
  variant = "default",
  locale,
}: PageShellProps) {
  return (
    <TooltipProvider>
      <div
        data-variant={variant}
        className="group min-h-screen flex flex-col bg-background text-foreground"
      >
        <Header locale={locale} />
        <main className="w-full flex-1 overflow-x-clip">{children}</main>
        <Footer locale={locale} />
      </div>
    </TooltipProvider>
  );
}
