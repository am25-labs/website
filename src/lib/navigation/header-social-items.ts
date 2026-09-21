import { siBehance, siGithub, siInstagram, siX } from "simple-icons";
import { siFlaskConical, siLinkedin } from "@/icons/custom";
import { withLocale, type Locale } from "@/lib/i18n";
import type { BrandIconData } from "@/types/domain";

export type HeaderSocialItem = {
  href: string;
  icon: BrandIconData;
  size?: number;
  target: "_blank" | "_self";
};

export function getHeaderSocialItems(locale: Locale): HeaderSocialItem[] {
  return [
    {
      href: withLocale(locale, "/labs"),
      icon: siFlaskConical,
      size: 20,
      target: "_self",
    },
    {
      href: "https://www.instagram.com/am25work",
      icon: siInstagram,
      size: 20,
      target: "_blank",
    },
    { href: "https://x.com/am25work", icon: siX, size: 20, target: "_blank" },
    // { href: "https://www.behance.net/am25work", icon: siBehance, size: 24, target: "_blank" },
    // { href: "https://github.com/am25-labs", icon: siGithub, size: 20, target: "_blank" },
    {
      href: "https://www.linkedin.com/company/am25",
      icon: siLinkedin,
      size: 20,
      target: "_blank",
    },
  ];
}
