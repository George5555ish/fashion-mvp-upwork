export const queryKeys = {
  publishedCollections: ['publishedCollections'] as const,
  closetItems: (userId?: string) => ['closetItems', userId] as const,
  outfits: (userId?: string) => ['outfits', userId] as const,
  adminCollections: (userId?: string) => ['adminCollections', userId] as const,
  adminLooks: (userId?: string) => ['adminLooks', userId] as const,
};
