/**
 * Known categories, in display order.
 *
 * A `category` in frontmatter is a plain string, not an enum — an entry with an
 * unknown category still builds and falls back to `DEFAULT_CATEGORY`. That is
 * deliberate: the whole point of this site is dropping in a new pattern without
 * first editing a schema.
 */
export type Category = {
  id: string;
  label: string;
  /** Accent hue, used for the chip and card glow. */
  accent: string;
};

export const CATEGORIES: Category[] = [
  { id: 'hero',             label: 'hero sections',    accent: '#7c8cff' },
  { id: 'social-proof',     label: 'social proof',     accent: '#4fd1c5' },
  { id: 'cta',              label: 'calls to action',  accent: '#f6a623' },
  { id: 'customer-profile', label: 'customer profiles',accent: '#e879f9' },
  { id: 'process',          label: 'process',          accent: '#60a5fa' },
  { id: 'pricing',          label: 'pricing',          accent: '#34d399' },
];

export const DEFAULT_CATEGORY: Category = {
  id: 'other',
  label: 'other',
  accent: '#94a3b8',
};

export function getCategory(id: string): Category {
  return CATEGORIES.find((c) => c.id === id) ?? { ...DEFAULT_CATEGORY, id, label: id.replace(/-/g, ' ') };
}
