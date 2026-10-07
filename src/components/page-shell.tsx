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
          "group min-h-screen flex flex-col bg-electric text-foreground",
          variant === "default" && [
            "[--background:var(--color-electric)] [--foreground:#ffffff]",
            "[--card:var(--color-electric)] [--card-foreground:#ffffff]",
            "[--popover:var(--color-electric)] [--popover-foreground:#ffffff]",
            "[--primary:var(--color-electric)] [--primary-foreground:#ffffff]",
            "[--secondary:var(--color-electric)] [--secondary-foreground:#ffffff]",
            "[--muted:var(--color-electric)] [--muted-foreground:#ffffff]",
            "[--accent:#ffffff] [--accent-foreground:var(--color-electric)]",
            "[--border:#ffffff] [--input:#ffffff] [--ring:#ffffff]",
            "[--destructive:#ffffff] [--destructive-foreground:#ffffff] [&_[data-slot=card]]:ring-white",
          ],
          variant === "light" && [
            "bg-white [--background:#ffffff] [--foreground:var(--color-electric)]",
            "[--card:#ffffff] [--card-foreground:var(--color-electric)]",
            "[--popover:#ffffff] [--popover-foreground:var(--color-electric)]",
            "[--primary:#ffffff] [--primary-foreground:var(--color-electric)]",
            "[--secondary:oklch(0.96_0_0)] [--secondary-foreground:var(--color-electric)]",
            "[--muted:oklch(0.96_0_0)] [--muted-foreground:var(--color-electric)]",
            "[--accent:var(--color-electric)] [--accent-foreground:#ffffff]",
            "[--border:var(--color-electric)] [--input:var(--color-electric)] [--ring:var(--color-electric)]",
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
