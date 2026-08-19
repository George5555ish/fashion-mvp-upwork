export const CLOSET_ITEM_LIMIT = 50;
export const ALBUM_LIMIT = 10;

export interface UsageLimits {
  current: number;
  max: number;
}

export function isAtLimit(limits: UsageLimits): boolean {
  return limits.current >= limits.max;
}
