import type { PlankMedia, FaqItem } from "./index";
import type { RichContent } from "./content";

// Home
export interface Home {
  heading: string;
  description: string;
  quote: string;
  services: Service[];
}

export interface Service {
  label: string;
}

// About
export interface About {
  quote: string;
  profile: PlankMedia;
  description: string;
  faq: FaqItem[];
}

// Legales
export interface LegalPage {
  content: RichContent;
  date?: string;
}

// Content Hub
export interface ContentHub {
  hero_title?: string;
  hero_description?: string;
  features: FaqItem[];
  end_title?: string;
  end_description?: string;
  pricing_title?: string;
  faq: FaqItem[];
}
