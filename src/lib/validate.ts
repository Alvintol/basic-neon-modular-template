import type { ClientConfig, Theme } from '../types';

const isThemeColour = (colour: string) => {
  if (/^#[0-9a-f]{6}(?:[0-9a-f]{2})?$/i.test(colour)) return true;

  const functionalColour = colour.match(/^(rgb|rgba)\((.+)\)$/i);
  if (!functionalColour) return false;

  const values = functionalColour[2].split(',').map((value) => value.trim());
  const expectedValues = functionalColour[1].toLowerCase() === 'rgba' ? 4 : 3;
  if (values.length !== expectedValues) return false;

  const channels = values.slice(0, 3).map(Number);
  if (channels.some((value) => !Number.isInteger(value) || value < 0 || value > 255)) return false;

  if (values.length === 4) {
    const alpha = Number(values[3]);
    if (!Number.isFinite(alpha) || alpha < 0 || alpha > 1) return false;
  }

  return true;
};

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
    if (!isThemeColour(colour)) errors.push(`Theme colour ${name} must be a six- or eight-digit hex, rgb, or rgba colour.`);
  }
  if (errors.length) throw new Error(`Configuration needs attention:\n${errors.map((error) => `- ${error}`).join('\n')}`);
};
