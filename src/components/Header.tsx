import { useRef, useState } from 'react';
import type { ClientConfig } from '../types';
import { ActionLink } from './ActionLink';
import { Photo } from './Photo';

export const Header = ({ client }: { client: ClientConfig }) => {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const links = client.sections.filter((section) => section.navLabel);

  return <header className="site-header container" onKeyDown={(event) => {
    if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
  }}>
    <a className="brand" href="#top" aria-label={client.business.name}>
      {client.business.logo ? <Photo image={client.business.logo} /> : <span className="brand-mark" aria-hidden="true">{client.business.monogram}</span>}
      <span>{client.business.name}</span>
    </a>
    <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open}
      aria-controls="main-navigation" onClick={() => setOpen(!open)}>
      {open ? client.ui.menuClose : client.ui.menuOpen}<span aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    <nav id="main-navigation" className={`navigation${open ? ' is-open' : ''}`} aria-label={client.ui.navigationLabel}>
      {links.map((section) => <a key={section.id} href={`#${section.id}`} onClick={() => setOpen(false)}>{section.navLabel}</a>)}
    </nav>
    <div className="header-action"><ActionLink action={client.headerAction} /></div>
  </header>;
};
