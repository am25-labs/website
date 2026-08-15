import "./globals.css";
import { getBaseMetadata } from "@/lib/metadata";
import { Martian_Mono } from "next/font/google";
import { getLocale } from "@/lib/i18n-server";

const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const tracking = process.env.DEPLOY_ENV === "production";

export async function generateMetadata() {
  return getBaseMetadata(await getLocale());
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        {tracking && (
          <script
            defer
            src="https://umami.am25.app/script.js"
            data-website-id="9c76d1a1-a940-4d82-8f58-6f006f348f15"
          ></script>
        )}
      </head>
      <body className={`${martian.className} bg-background antialiased`}>
        {children}
      </body>
    </html>
  );
}
