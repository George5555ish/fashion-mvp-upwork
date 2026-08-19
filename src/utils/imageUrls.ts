import { getStoredToken } from '../services/authStorage';
import { getApiBaseUrl } from './apiBaseUrl';

function withAccessToken(url: string): string {
  const token = getStoredToken();
  if (!token) {
    return url;
  }

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}access_token=${encodeURIComponent(token)}`;
}

export function getClosetItemImageUrl(itemId: string): string {
  return withAccessToken(`${getApiBaseUrl()}/closet/items/${itemId}/image`);
}

export function getCuratedLookImageUrl(lookId: string): string {
  return `${getApiBaseUrl()}/looks/${lookId}/image`;
}

export function getAdminLookImageUrl(lookId: string): string {
  return withAccessToken(`${getApiBaseUrl()}/admin/looks/${lookId}/image`);
}

export function getSharedOutfitItemImageUrl(shareId: string, itemId: string): string {
  return `${getApiBaseUrl()}/share/outfits/${shareId}/items/${itemId}/image`;
}

interface ImageSource {
  id: string;
  imageMimeType: string;
  imageBase64?: string;
}

export function getClosetItemImageSrc(item: ImageSource): string {
  if (item.imageBase64) {
    return `data:${item.imageMimeType};base64,${item.imageBase64}`;
  }

  return getClosetItemImageUrl(item.id);
}

export function getCuratedLookImageSrc(look: ImageSource): string {
  if (look.imageBase64) {
    return `data:${look.imageMimeType};base64,${look.imageBase64}`;
  }

  return getCuratedLookImageUrl(look.id);
}

export function getAdminLookImageSrc(look: ImageSource): string {
  if (look.imageBase64) {
    return `data:${look.imageMimeType};base64,${look.imageBase64}`;
  }

  return getAdminLookImageUrl(look.id);
}
