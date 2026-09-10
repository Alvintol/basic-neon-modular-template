import type { ClientConfig, Theme } from '../types';

export const validateConfig = (client: ClientConfig, theme: Theme) => {
  const errors: string[] = [];
  const ids = new Set(['top', 'main']);
  const sections = client.sections;
  for (const section of sections) {
    if (!/^[a-z][a-z0-9-]*$/.test(section.id)) errors.push(`Invalid section id: ${section.id}`);
    if (ids.has(section.id)) errors.push(`Duplicate section id: ${section.id}`);
    ids.add(section.id);
    if (section.type === 'showcase' && section.items.length === 0) errors.push(`${section.id}: add at least one image or remove the section.`);
    if (section.type === 'contact') {
      if (!client.demo.enabled && section.method.mode === 'demo') errors.push(`${section.id}: choose email or link contact mode before disabling the demo banner.`);
      if (section.method.mode === 'email' && !/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(section.method.email)) errors.push(`${section.id}: invalid email address.`);
      if (section.method.mode === 'link' && !/^https:\/\//.test(section.method.url)) errors.push(`${section.id}: booking links must start with https://.`);
    }
  }
  const walk = (value: unknown, path = 'client') => {
    if (!value || typeof value !== 'object') return;
    for (const [key, item] of Object.entries(value)) {
      const name = `${path}.${key}`;
      if (key === 'href' && typeof item === 'string') {
        if (item.startsWith('#') && !ids.has(item.slice(1))) errors.push(`${name}: target ${item} does not exist.`);
        else if (!/^(#.+|https:\/\/\S+|mailto:[^\s]+|tel:\+?[\d\s()-]+)$/.test(item)) errors.push(`${name}: use a section anchor, HTTPS, mailto, or tel link.`);
      }
      if (key === 'src' && typeof item === 'string' && !/^(images\/[a-zA-Z0-9_./-]+|https:\/\/\S+)$/.test(item)) errors.push(`${name}: use an images/ path or HTTPS URL.`);
      if (key === 'alt' && typeof item === 'string' && !item.trim()) errors.push(`${name}: add a useful image description.`);
      walk(item, name);
    }
  };
  walk(client);
  if (!client.business.name.trim() || !client.seo.title.trim() || !client.seo.description.trim()) errors.push('Business name, SEO title and description are required.');
  if (client.demo.enabled && client.seo.indexable) errors.push('Keep fictional demo sites noindex.');
  if (client.seo.url && !/^https:\/\//.test(client.seo.url)) errors.push('SEO URL must use HTTPS.');
  for (const [name, colour] of Object.entries(theme.colours)) {
    if (!/^#[0-9a-f]{6}$/i.test(colour)) errors.push(`Theme colour ${name} must be a six-digit hex colour.`);
  }
  if (errors.length) throw new Error(`Configuration needs attention:\n${errors.map((error) => `- ${error}`).join('\n')}`);
};
