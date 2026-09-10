import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { ShowcaseItem, ShowcaseSection } from '../types';
import { Photo } from '../components/Photo';
import { SectionIntro } from '../components/SectionIntro';
import { ActionLink } from '../components/ActionLink';

const Caption = ({ item }: { item: ShowcaseItem }) => <figcaption>
  {item.category && <p className="photo-category">{item.category}</p>}
  <h3>{item.title}</h3>{item.description && <p>{item.description}</p>}
  {item.action && <ActionLink action={item.action} secondary />}
</figcaption>;

// One data model works for photos of staff, products, services or completed work.
export const PhotoShowcase = ({ section }: { section: ShowcaseSection }) => {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: section.items.length <= 1 });
  const grid = section.layout === 'grid';
  const spotlight = section.layout === 'spotlight';

  useEffect(() => {
    const node = track.current;
    if (!node || grid) return;
    const update = () => {
      const cards = Array.from(node.children) as HTMLElement[];
      const start = cards[0]?.offsetLeft ?? 0;
      let closest = 0;
      cards.forEach((card, index) => {
        if (Math.abs(card.offsetLeft - start - node.scrollLeft) < Math.abs(cards[closest].offsetLeft - start - node.scrollLeft)) closest = index;
      });
      setCurrent(closest);
      setEdges({ start: node.scrollLeft <= 2, end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 2 });
    };
    update();
    node.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => { node.removeEventListener('scroll', update); observer.disconnect(); };
  }, [grid, section.items.length, section.layout]);

  const go = (index: number) => {
    const node = track.current;
    if (!node) return;
    const cards = Array.from(node.children) as HTMLElement[];
    const target = cards[Math.max(0, Math.min(index, cards.length - 1))];
    if (!target) return;
    node.scrollTo({
      left: target.offsetLeft - cards[0].offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  };
  const keyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); go(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(current - 1); }
    if (event.key === 'Home') { event.preventDefault(); go(0); }
    if (event.key === 'End') { event.preventDefault(); go(section.items.length - 1); }
  };
  if (!section.items.length) return null;

  return <section id={section.id} className={`section showcase showcase-${section.layout} aspect-${section.aspect} container`}
    aria-labelledby={`${section.id}-title`} aria-roledescription={grid ? undefined : section.labels.carousel}>
    <div className="showcase-heading"><SectionIntro section={section} />
      {!grid && section.items.length > 1 && <div className="carousel-controls">
        <button type="button" aria-label={section.labels.previous} aria-controls={`${section.id}-track`} disabled={edges.start} onClick={() => go(current - 1)}>←</button>
        <button type="button" aria-label={section.labels.next} aria-controls={`${section.id}-track`} disabled={edges.end} onClick={() => go(current + 1)}>→</button>
      </div>}
    </div>
    {!grid && <p className="carousel-hint" id={`${section.id}-hint`}>{section.labels.instructions}</p>}
    <div ref={track} id={`${section.id}-track`} className="photo-track" tabIndex={grid ? undefined : 0}
      aria-label={section.title} aria-describedby={grid ? undefined : `${section.id}-hint`} onKeyDown={grid ? undefined : keyboard}>
      {section.items.map((item) => <figure className="photo-card" key={item.id}>
        <Caption item={item} />
        <div className="photo-frame"><Photo image={item.image} /></div>
      </figure>)}
    </div>
    {spotlight && section.items.length > 1 && <div className="spotlight-pagination">
      <div className="thumbnail-list">{section.items.map((item, index) => <button type="button" key={item.id}
        aria-label={`${section.labels.show} ${item.title}`} aria-current={current === index ? 'true' : undefined}
        aria-controls={`${section.id}-track`} onClick={() => go(index)}>
        <img src={item.image.src} alt="" width="80" height="56" loading="lazy" />
      </button>)}</div>
      <p className="carousel-count" aria-live="polite" aria-atomic="true">{String(current + 1).padStart(2, '0')} / {String(section.items.length).padStart(2, '0')}</p>
    </div>}
  </section>;
};
