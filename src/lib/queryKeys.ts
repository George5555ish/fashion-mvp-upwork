export const queryKeys = {
  publishedCollections: ['publishedCollections'] as const,
  publishedLook: (lookId: string) => ['publishedLook', lookId] as const,
  closetItems: (userId?: string) => ['closetItems', userId] as const,
  outfits: (userId?: string) => ['outfits', userId] as const,
  albums: (userId?: string) => ['albums', userId] as const,
  album: (userId: string | undefined, albumId: string) => ['album', userId, albumId] as const,
  analysis: (uploadId: string) => ['analysis', uploadId] as const,
  sharedOutfit: (shareId: string) => ['sharedOutfit', shareId] as const,
  adminCollections: (userId?: string) => ['adminCollections', userId] as const,
  adminLooks: (userId?: string) => ['adminLooks', userId] as const,
};
