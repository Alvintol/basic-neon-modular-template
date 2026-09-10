export type ImageAsset = {
  // Files in public use relative paths, for example images/hero.jpg.
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};

export type Action = { label: string; href: string };
export type SectionHeading = {
  id: string;
  navLabel?: string;
  eyebrow?: string;
  title: string;
  description?: string;
};
export type Service = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  price?: string;
  features?: string[];
  action?: Action;
};
export type ServicesSection = SectionHeading & { type: 'services'; items: Service[] };
export type AboutSection = SectionHeading & {
  type: 'about'; body: string[];
  details?: { label: string; value: string }[];
};
export type ProcessSection = SectionHeading & {
  type: 'process'; steps: { title: string; description: string }[];
};
export type ShowcaseItem = {
  id: string; image: ImageAsset; title: string;
  category?: string; description?: string; action?: Action;
};
export type ShowcaseSection = SectionHeading & {
  type: 'showcase';
  layout: 'filmstrip' | 'spotlight' | 'grid' | 'portraits';
  aspect: 'landscape' | 'portrait' | 'square';
  labels: { previous: string; next: string; show: string; instructions: string; carousel: string };
  items: ShowcaseItem[];
};
export type FaqSection = SectionHeading & {
  type: 'faq'; items: { question: string; answer: string }[];
};
export type ContactMethod =
  | { mode: 'demo'; submitLabel: string; help: string; success: string }
  | { mode: 'email'; email: string; subject: string; submitLabel: string; help: string; success: string }
  | { mode: 'link'; url: string; label: string; help: string };
export type ContactSection = SectionHeading & {
  type: 'contact'; method: ContactMethod;
  details: { label: string; value: string; href?: string }[];
  fields: {
    name: string; email: string; service: string; message: string;
    servicePlaceholder: string; services: string[];
  };
};
export type Section = ServicesSection | AboutSection | ProcessSection | ShowcaseSection | FaqSection | ContactSection;

export type ClientConfig = {
  demo: { enabled: boolean; label: string; note: string };
  business: { name: string; monogram: string; location: string; logo?: ImageAsset };
  seo: { title: string; description: string; language: string; indexable: boolean; url?: string };
  ui: { skipToContent: string; menuOpen: string; menuClose: string; navigationLabel: string; backToTop: string };
  headerAction: Action;
  hero: {
    eyebrow: string; title: string[]; emphasis?: string; description: string;
    primaryAction: Action; secondaryAction?: Action;
    image?: ImageAsset; imageCaption?: string;
    note?: string; locationLabel?: string;
    highlights: { title: string; description: string }[];
  };
  // Array order is page order. A section with navLabel appears in navigation.
  sections: Section[];
  footer: { note: string; copyright: string; links: Action[] };
};

export type Theme = {
  colours: {
    background: string; surface: string; text: string; muted: string;
    border: string; primary: string; onPrimary: string;
    accent: string; onAccent: string; feature: string; onFeature: string;
  };
  fonts: { body: string; heading: string; accent: string };
  shape: { radius: string; buttonRadius: string; contentWidth: string };
};
