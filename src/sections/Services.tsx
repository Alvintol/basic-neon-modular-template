import type { ServicesSection } from '../types';
import { ActionLink } from '../components/ActionLink';
import { SectionIntro } from '../components/SectionIntro';

export const Services = ({ section }: { section: ServicesSection }) => (
  <section className="section services container" id={section.id} aria-labelledby={`${section.id}-title`}>
    <SectionIntro section={section} />
    <div className="services-grid">
      {section.items.map((item) => <article className="service-card" key={item.id}>
        <div className="service-body"><h3>{item.title}</h3>
          {item.subtitle && <p className="service-subtitle">{item.subtitle}</p>}
          <p>{item.description}</p>
          {item.features && <ul className="feature-list">{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>}
        </div>
        {(item.price || item.action) && <div className="service-bottom">{item.price && <p className="price">{item.price}</p>}{item.action && <ActionLink action={item.action} secondary />}</div>}
      </article>)}
    </div>
  </section>
);
