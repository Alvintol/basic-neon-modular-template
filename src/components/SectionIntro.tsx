import type { SectionHeading } from '../types';

export const SectionIntro = ({ section }: { section: SectionHeading }) => (
  <div className="section-intro">
    {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
    <h2 id={`${section.id}-title`}>{section.title}</h2>
    {section.description && <p className="section-description">{section.description}</p>}
  </div>
);
