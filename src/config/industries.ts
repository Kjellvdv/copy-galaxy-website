/**
 * What the company sells, and into which market.
 *
 * `aliases` exist because the label alone is a bad search target: someone looking
 * for "finance" should find Stripe, Lemonade and a mortgage lender even though
 * none of them are labelled that. They are folded into each card's search text at
 * build time and never rendered.
 */
export type Industry = {
  id: string;
  label: string;
  aliases: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    id: 'fintech',
    label: 'fintech',
    aliases: ['finance', 'financial services', 'payments', 'banking', 'money', 'b2b'],
  },
  {
    id: 'insurance',
    label: 'insurance',
    aliases: ['insurtech', 'finance', 'financial services', 'consumer'],
  },
  {
    id: 'lending',
    label: 'lending',
    aliases: ['mortgage', 'loans', 'finance', 'financial services', 'banking', 'consumer'],
  },
  {
    id: 'investing',
    label: 'investing',
    aliases: ['investment', 'wealth', 'finance', 'financial services', 'franchise'],
  },
  {
    id: 'martech',
    label: 'marketing software',
    aliases: ['martech', 'marketing', 'saas', 'b2b', 'email', 'seo', 'ecommerce'],
  },
  {
    id: 'devtools',
    label: 'developer tools',
    aliases: ['devtools', 'saas', 'b2b', 'monitoring', 'engineering', 'infrastructure'],
  },
  {
    id: 'productivity',
    label: 'productivity',
    aliases: ['saas', 'b2b', 'collaboration', 'meetings', 'workplace'],
  },
  {
    id: 'edtech',
    label: 'education',
    aliases: ['edtech', 'learning', 'courses', 'training', 'cohort'],
  },
  {
    id: 'people',
    label: 'people & training',
    aliases: ['hr', 'hrtech', 'l&d', 'leadership', 'training', 'learning', 'workplace'],
  },
  {
    id: 'customer-service',
    label: 'customer service',
    aliases: ['support', 'saas', 'b2b', 'contact centre', 'contact center'],
  },
];

export const DEFAULT_INDUSTRY: Industry = { id: 'other', label: 'other', aliases: [] };

export function getIndustry(id: string): Industry {
  return (
    INDUSTRIES.find((i) => i.id === id) ?? {
      ...DEFAULT_INDUSTRY,
      id,
      label: id.replace(/-/g, ' '),
    }
  );
}
