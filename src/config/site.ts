export const siteConfig = {
  name: 'OutFind',
  logoUrl: '/outfind-logo.png',
  tagline: 'Find any outfit. Shop every piece.',
  description:
    'Upload outfit photos and discover clothing items with AI. Find similar styles and affordable dupes with curated shopping links.',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'outfind.styler@gmail.com',
  url: import.meta.env.VITE_SITE_URL || window.location.origin,
};
