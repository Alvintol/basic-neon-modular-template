import type { ClientConfig, Section, Theme } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { About } from './sections/About';
import { Process } from './sections/Process';
import { PhotoShowcase } from './sections/PhotoShowcase';
import { Faq } from './sections/Faq';
import { Contact } from './sections/Contact';
import { themeVariables } from './lib/theme';

const SectionRenderer = ({ section }: { section: Section }) => {
  switch (section.type) {
    case 'services': return <Services section={section} />;
    case 'about': return <About section={section} />;
    case 'process': return <Process section={section} />;
    case 'showcase': return <PhotoShowcase section={section} />;
    case 'faq': return <Faq section={section} />;
    case 'contact': return <Contact section={section} />;
  }
};

export const App = ({ client, theme }: { client: ClientConfig; theme: Theme }) => (
  <div className="site" id="top" style={themeVariables(theme)}>
    <a className="skip-link" href="#main">{client.ui.skipToContent}</a>
    {client.demo.enabled && <aside className="demo-banner"><span>{client.demo.label}</span><span>{client.demo.note}</span></aside>}
    <Header client={client} />
    <main id="main" tabIndex={-1}>
      <Hero hero={client.hero} />
      {client.sections.map((section) => <SectionRenderer key={section.id} section={section} />)}
    </main>
    <Footer client={client} />
  </div>
);
