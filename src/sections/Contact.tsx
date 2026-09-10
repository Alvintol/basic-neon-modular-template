import { useState, type FormEvent } from 'react';
import type { ContactSection } from '../types';
import { SectionIntro } from '../components/SectionIntro';
import { ActionLink } from '../components/ActionLink';

export const Contact = ({ section }: { section: ContactSection }) => {
  const [status, setStatus] = useState('');
  const { fields, method } = section;
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (method.mode === 'link') return;
    if (method.mode === 'email') {
      const data = new FormData(event.currentTarget);
      const body = [
        `${fields.name}: ${data.get('name')}`, `${fields.email}: ${data.get('email')}`,
        `${fields.service}: ${data.get('service')}`, '', String(data.get('message')),
      ].join('\n');
      window.location.href = `mailto:${method.email}?subject=${encodeURIComponent(method.subject)}&body=${encodeURIComponent(body)}`;
    }
    setStatus(method.success);
  };

  return <section className="section contact container" id={section.id} aria-labelledby={`${section.id}-title`}>
    <div className="contact-copy"><SectionIntro section={section} />
      <dl className="details-list">{section.details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt>
        <dd>{detail.href ? <a href={detail.href}>{detail.value}</a> : detail.value}</dd></div>)}</dl>
    </div>
    <div className="contact-panel">
      {method.mode === 'link' ? <><p>{method.help}</p><ActionLink action={{ href: method.url, label: method.label }} /></> :
        <form onSubmit={submit} onInput={() => setStatus('')} aria-describedby={`${section.id}-help`}>
          <div className="form-row"><label htmlFor={`${section.id}-name`}>{fields.name}
            <input id={`${section.id}-name`} name="name" autoComplete="name" required maxLength={100} /></label>
          <label htmlFor={`${section.id}-email`}>{fields.email}
            <input id={`${section.id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} /></label></div>
          <label htmlFor={`${section.id}-service`}>{fields.service}
            <select id={`${section.id}-service`} name="service" defaultValue="" required>
              <option value="" disabled>{fields.servicePlaceholder}</option>
              {fields.services.map((service) => <option key={service}>{service}</option>)}
            </select></label>
          <label htmlFor={`${section.id}-message`}>{fields.message}
            <textarea id={`${section.id}-message`} name="message" rows={4} maxLength={1200} required /></label>
          <p className="form-help" id={`${section.id}-help`}>{method.help}</p>
          <button className="button" type="submit">{method.submitLabel}<span aria-hidden="true">↗</span></button>
          <p className="form-status" role="status" aria-live="polite">{status}</p>
        </form>}
    </div>
  </section>;
};
