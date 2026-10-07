import "./globals.css";
import { getBaseMetadata } from "@/lib/metadata";
import { Martian_Mono } from "next/font/google";
import { defaultLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const tracking = process.env.DEPLOY_ENV === "production";

export function generateMetadata() {
  return getBaseMetadata(defaultLocale);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={defaultLocale}>
      <head>
        {tracking && (
          <script
            defer
            src="https://umami.am25.app/script.js"
            data-website-id="9c76d1a1-a940-4d82-8f58-6f006f348f15"
          ></script>
        )}
      </head>
      <body
        className={cn(
          martian.className,
          "bg-electric antialiased",
          "has-[>[data-variant=default]]:[--background:var(--color-electric)] has-[>[data-variant=default]]:[--foreground:#ffffff]",
          "has-[>[data-variant=default]]:[--card:var(--color-electric)] has-[>[data-variant=default]]:[--card-foreground:#ffffff]",
          "has-[>[data-variant=default]]:[--popover:var(--color-electric)] has-[>[data-variant=default]]:[--popover-foreground:#ffffff]",
          "has-[>[data-variant=default]]:[--primary:var(--color-electric)] has-[>[data-variant=default]]:[--primary-foreground:#ffffff]",
          "has-[>[data-variant=default]]:[--secondary:var(--color-electric)] has-[>[data-variant=default]]:[--secondary-foreground:#ffffff]",
          "has-[>[data-variant=default]]:[--muted:var(--color-electric)] has-[>[data-variant=default]]:[--muted-foreground:#ffffff]",
          "has-[>[data-variant=default]]:[--accent:#ffffff] has-[>[data-variant=default]]:[--accent-foreground:var(--color-electric)]",
          "has-[>[data-variant=default]]:[--border:#ffffff] has-[>[data-variant=default]]:[--input:#ffffff] has-[>[data-variant=default]]:[--ring:#ffffff]",
          "has-[>[data-variant=default]]:[--destructive:#ffffff] has-[>[data-variant=default]]:[--destructive-foreground:#ffffff]",
          "has-[>[data-variant=light]]:bg-white has-[>[data-variant=light]]:[--background:#ffffff] has-[>[data-variant=light]]:[--foreground:var(--color-electric)]",
          "has-[>[data-variant=light]]:[--card:#ffffff] has-[>[data-variant=light]]:[--card-foreground:var(--color-electric)]",
          "has-[>[data-variant=light]]:[--popover:#ffffff] has-[>[data-variant=light]]:[--popover-foreground:var(--color-electric)]",
          "has-[>[data-variant=light]]:[--primary:#ffffff] has-[>[data-variant=light]]:[--primary-foreground:var(--color-electric)]",
          "has-[>[data-variant=light]]:[--secondary:oklch(0.96_0_0)] has-[>[data-variant=light]]:[--secondary-foreground:var(--color-electric)]",
          "has-[>[data-variant=light]]:[--muted:oklch(0.96_0_0)] has-[>[data-variant=light]]:[--muted-foreground:var(--color-electric)]",
          "has-[>[data-variant=light]]:[--accent:var(--color-electric)] has-[>[data-variant=light]]:[--accent-foreground:#ffffff]",
          "has-[>[data-variant=light]]:[--border:var(--color-electric)] has-[>[data-variant=light]]:[--input:var(--color-electric)] has-[>[data-variant=light]]:[--ring:var(--color-electric)]",
        )}
      >
        {children}
      </body>
    </html>
  );
}
