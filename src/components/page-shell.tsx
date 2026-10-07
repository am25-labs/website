import Header from "@/components/header";
import Footer from "@/components/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Variant = "default" | "light";

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
        className={cn(
          "group min-h-screen flex flex-col bg-plot text-foreground",
          variant === "default" && [
            "[--background:var(--color-plot)] [--foreground:#ffffff]",
            "[--card:var(--color-plot)] [--card-foreground:#ffffff]",
            "[--popover:var(--color-plot)] [--popover-foreground:#ffffff]",
            "[--primary:var(--color-plot)] [--primary-foreground:#ffffff]",
            "[--secondary:var(--color-plot)] [--secondary-foreground:#ffffff]",
            "[--muted:var(--color-plot)] [--muted-foreground:#ffffff]",
            "[--accent:#ffffff] [--accent-foreground:var(--color-plot)]",
            "[--border:#ffffff] [--input:#ffffff] [--ring:#ffffff]",
            "[--destructive:#ffffff] [--destructive-foreground:#ffffff] [&_[data-slot=card]]:ring-white",
          ],
          variant === "light" && [
            "bg-white [--background:#ffffff] [--foreground:var(--color-plot)]",
            "[--card:#ffffff] [--card-foreground:var(--color-plot)]",
            "[--popover:#ffffff] [--popover-foreground:var(--color-plot)]",
            "[--primary:#ffffff] [--primary-foreground:var(--color-plot)]",
            "[--secondary:oklch(0.96_0_0)] [--secondary-foreground:var(--color-plot)]",
            "[--muted:oklch(0.96_0_0)] [--muted-foreground:var(--color-plot)]",
            "[--accent:var(--color-plot)] [--accent-foreground:#ffffff]",
            "[--border:var(--color-plot)] [--input:var(--color-plot)] [--ring:var(--color-plot)]",
          ],
        )}
      >
        <Header locale={locale} />
        <main className="w-full flex-1 overflow-x-clip">{children}</main>
        <Footer locale={locale} />
      </div>
    </TooltipProvider>
  );
}
