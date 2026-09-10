import type { ProcessSection } from '../types';
import { SectionIntro } from '../components/SectionIntro';

export const Process = ({ section }: { section: ProcessSection }) => (
  <section className="section process container" id={section.id} aria-labelledby={`${section.id}-title`}>
    <SectionIntro section={section} />
    <ol className="process-list">{section.steps.map((step) => <li key={step.title}>
      <div><h3>{step.title}</h3><p>{step.description}</p></div>
    </li>)}</ol>
  </section>
);
