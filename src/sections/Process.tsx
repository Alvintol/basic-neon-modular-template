import type { ProcessSection } from '../types';
import { SectionIntro } from '../components/SectionIntro';

export const Process = ({ section }: { section: ProcessSection }) => (
  <section className="section process container" id={section.id} aria-labelledby={`${section.id}-title`}>
    <SectionIntro section={section} />
    <ol className="process-list">{section.steps.map((step, index) => <li key={step.title}>
      <span className="step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div><h3>{step.title}</h3><p>{step.description}</p></div>
    </li>)}</ol>
  </section>
);
