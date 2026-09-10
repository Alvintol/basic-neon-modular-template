import assert from 'node:assert/strict';
import { createServer } from 'vite';

// Checks the reusable contract: client swaps, section changes and gallery variants.
const server = await createServer({ server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' });
try {
  const { client, theme, render, validateConfig } = await server.ssrLoadModule('/src/entry-server.tsx');
  validateConfig(client, theme);
  const changed = structuredClone(client);
  changed.business.name = 'Replacement Client';
  changed.demo.enabled = false;
  changed.sections = changed.sections.map((section) => section.type === 'contact' ? {
    ...section, method: { mode: 'email', email: 'hello@example.com', subject: 'Website enquiry', submitLabel: 'Create email', help: 'Opens your email app.', success: 'Send from your email app.' },
  } : section);
  const newTheme = structuredClone(theme);
  newTheme.colours.primary = '#123456';
  validateConfig(changed, newTheme);
  const html = render(changed, newTheme);
  assert(html.includes('Replacement Client'));
  assert(!html.includes('demo-banner'));
  assert(html.includes('--primary:#123456'));
  if (changed.sections.some((section) => section.type === 'contact')) assert(html.includes('Create email'));
  for (const layout of ['filmstrip', 'spotlight', 'grid', 'portraits']) {
    const variant = structuredClone(client);
    const gallery = variant.sections.find((section) => section.type === 'showcase');
    if (!gallery) continue;
    gallery.layout = layout;
    for (const count of [1, gallery.items.length]) {
      gallery.items = client.sections.find((section) => section.type === 'showcase').items.slice(0, count);
      validateConfig(variant, theme);
      assert(render(variant).includes(`showcase-${layout}`));
    }
  }
  const noHeroImage = structuredClone(client);
  delete noHeroImage.hero.image;
  assert(render(noHeroImage).includes('hero-title'));
  const removed = structuredClone(client);
  removed.sections = removed.sections.filter((section) => section.type !== 'faq');
  validateConfig(removed, theme);
  assert(!render(removed).includes('faq-list'));
  const linked = structuredClone(changed);
  linked.sections = linked.sections.map((section) => section.type === 'contact' ? { ...section, method: { mode: 'link', url: 'https://example.com/booking', label: 'Book externally', help: 'Opens the booking service.' } } : section);
  validateConfig(linked, theme);
  if (linked.sections.some((section) => section.type === 'contact')) assert(render(linked).includes('https://example.com/booking'));
  const invalid = structuredClone(client);
  invalid.headerAction.href = '#missing';
  assert.throws(() => validateConfig(invalid, theme), /does not exist/);
  const noDemoContact = structuredClone(client);
  noDemoContact.demo.enabled = false;
  noDemoContact.sections = noDemoContact.sections.map((section) => section.type === 'contact' ? { ...section, method: { mode: 'demo', submitLabel: 'Preview', help: 'Test', success: 'Test' } } : section);
  if (noDemoContact.sections.some((section) => section.type === 'contact')) assert.throws(() => validateConfig(noDemoContact, theme), /choose email or link/);
  const reordered = structuredClone(client);
  reordered.sections.reverse();
  validateConfig(reordered, theme);
  if (client.sections.length) assert(render(reordered).includes(client.sections[0].title));
  console.log('Client and colour swaps, all four photo layouts, single-image cases, section reorder, broken anchors and contact modes passed.');
} finally { await server.close(); }
