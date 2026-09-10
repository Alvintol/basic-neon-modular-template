import type { AboutSection } from '../types';
import { SectionIntro } from '../components/SectionIntro';

export const About = ({ section }: { section: AboutSection }) => (
  <section className="section about container" id={section.id} aria-labelledby={`${section.id}-title`}>
    <SectionIntro section={section} />
    <div className="about-body">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.details && <dl className="details-list">{section.details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}</dl>}
    </div>
  </section>
);
