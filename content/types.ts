export type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'video'; src: string; poster?: string }
  | { type: 'images'; images: { src: string; alt: string }[] };

export type Section = { heading: string; blocks: Block[] };

export type Link = { label: string; href: string };

export type ProjectCategory = 'data' | 'ai' | 'fullstack' | 'mobile' | 'research' | 'hardware';

export type Project = {
  slug: string;
  title: string;
  /** One-liner shown on board cards and in the command palette. */
  tagline: string;
  /** Opening paragraph of the case study. */
  intro: string;
  categories: ProjectCategory[];
  tags: string[];
  /** Gradient used for the card cover when there is no image. */
  accent: [string, string];
  cover?: { src: string; alt: string };
  status?: string;
  links: Link[];
  sections: Section[];
};

export type Role = {
  company: string;
  role: string;
  start: string;
  end: string;
  current?: boolean;
  /** Logo in /public. `cover` = edge-to-edge square logo (e.g. TD); `contain` = padded on white. Omit for a letter badge. */
  logo?: { src: string; fit: 'cover' | 'contain' };
  bullets: string[];
  stack: string[];
};

export type BlogPost = {
  n: number;
  date: string;
  title: string;
  video: { src: string; poster: string };
  blocks: Block[];
};
