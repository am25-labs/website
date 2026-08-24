import type { TiptapDoc } from "./index";
import type { PlankMedia, PlankMediaGallery } from "./index";

// Rich Content
export type RichContent = string | TiptapDoc;

// Author
export interface Author {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  job_title: string | null;
  organization: string | null;
  country: string | null;
  slug?: string | null;
}

// Works
export interface Work {
  id: string;
  title: string;
  slug: string;
  cover: PlankMedia | null;
  description: string | null;
  quote: string | null;
  images_before: PlankMediaGallery | null;
  images_after: PlankMediaGallery | null;
  client: string | null;
  campaign: string | null;
  country: string | null;
  creative: string | null;
  strategy: string | null;
  lead_design: string | null;
  design: string | null;
  copy: string | null;
  illustration: string | null;
  animation: string | null;
  photo: string | null;
  develop: string | null;
  date: string | null;
  featured: boolean;
  work_team: string | null;
  disciplines: Discipline[];
}

export interface Discipline {
  id: string;
  title: string;
  slug: string;
}

// Notes
export interface Note {
  id: string;
  title: string;
  slug: string;
  cover: PlankMedia | null;
  content: RichContent;
  category: Category | null;
  author: Author;
  published_at: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
}
