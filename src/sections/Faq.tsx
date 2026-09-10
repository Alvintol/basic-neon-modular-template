import type { FaqSection } from '../types';
import { SectionIntro } from '../components/SectionIntro';

export const Faq = ({ section }: { section: FaqSection }) => (
  <section className="section faq container" id={section.id} aria-labelledby={`${section.id}-title`}>
    <SectionIntro section={section} />
    <div className="faq-list">{section.items.map((item) => <details key={item.question}>
      <summary>{item.question}<span className="faq-icon" aria-hidden="true">+</span></summary><p>{item.answer}</p>
    </details>)}</div>
  </section>
);
