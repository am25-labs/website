import type { SimpleIcon } from "simple-icons";
import type { Author } from "./index";
import type { CustomIcon } from "@/icons/custom";
import type { Locale } from "@/lib/i18n";

export type BrandIconData = SimpleIcon | CustomIcon;

// Grids
export interface GridProps {
  className?: string;
  gap?: string;
  children?: React.ReactNode;
}

// Footer
export interface Footer {
  claim: string;
}

// Accordions
export interface AccordionWrapItem {
  label: string;
  content: string;
}

export interface FaqItem {
  label: string;
  description: string;
}

// Cards
export interface WorkCardProps {
  cover?: string | null;
  title: string;
  href: string;
  category: string;
  publishedAt?: string;
}

export interface NoteCardProps {
  cover?: string | null;
  title: string;
  href: string;
  category: string;
  publishedAt?: string;
  author?: Author | null;
  locale?: Locale;
}

// Tiles
export interface LogoTileProps {
  logo: string;
  title: string;
  href?: string;
}

export interface BrandIconProps {
  icon: BrandIconData;
  size?: number;
  "aria-label"?: string;
}
