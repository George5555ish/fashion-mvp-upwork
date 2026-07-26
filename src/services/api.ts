import axios from 'axios';
import { clearStoredToken, getStoredToken, setStoredToken } from './authStorage';

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;

  if (envUrl) {
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
  }

  if (import.meta.env.DEV) {
    return '/api';
  }

  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UploadResponse {
  uploadId: string;
  message: string;
  status: string;
}

export interface DetectedItem {
  itemId: string;
  category: string;
  color: string;
  style: string;
  description: string;
  matchedProducts: Product[];
  matchSource?: 'ebay' | 'shopping' | 'mixed' | 'seed';
  ebayResultCount?: number | null;
  shoppingResultCount?: number | null;
}

export interface Product {
  _id: string;
  productId: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  imageUrl: string;
  shopUrl: string;
  tags: string[];
  description: string;
  color: string;
  style: string;
  source?: 'seed' | 'ebay' | 'shopping';
}

export interface AnalysisResponse {
  uploadId: string;
  status: string;
  uploadDate: string;
  imageBase64: string;
  imageMimeType: string;
  detectedItems: DetectedItem[];
  analysisResults: unknown;
  error?: string;
}

export interface AlbumSummary {
  id: string;
  name: string;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AlbumItem {
  id: string;
  product: Product;
  notes: string;
  savedFromUploadId: string;
  detectedCategory: string;
  detectedColor: string;
  savedAt: string;
}

export interface AlbumDetail extends AlbumSummary {
  items: AlbumItem[];
}

export interface AffiliateLink {
  label: string;
  url: string;
}

export interface CuratedLookSummary {
  id: string;
  title: string;
  caption: string;
  links: AffiliateLink[];
  imageMimeType: string;
  imageBase64: string;
  collectionId?: string | null;
  collectionName?: string | null;
  createdAt: string;
}

export interface CuratedLook extends CuratedLookSummary {
  imageBase64: string;
  published?: boolean;
  updatedAt?: string;
}

export interface CuratedCollectionSummary {
  id: string;
  name: string;
  published: boolean;
  lookCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CuratedCollection extends CuratedCollectionSummary {
  looks: CuratedLookSummary[];
}

export interface PublishedCollectionsResponse {
  collections: CuratedCollection[];
  uncategorizedLooks: CuratedLookSummary[];
}

export interface ClosetItem {
  id: string;
  name: string;
  category: string;
  color: string;
  imageMimeType: string;
  imageBase64: string;
  createdAt: string;
}

export interface Outfit {
  id: string;
  name: string;
  items: ClosetItem[];
  shareId?: string | null;
  isShared?: boolean;
  sharedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SharedOutfit {
  name: string;
  creatorName: string;
  items: ClosetItem[];
  sharedAt: string;
}

export async function register(email: string, password: string, name?: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/register', { email, password, name });
  setStoredToken(response.data.token);
  return response.data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  setStoredToken(response.data.token);
  return response.data;
}

export function logout(): void {
  clearStoredToken();
}

export async function getMe(): Promise<User> {
  const response = await api.get<{ user: User }>('/auth/me');
  return response.data.user;
}

export async function uploadImage(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post<UploadResponse>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

export async function getAnalysis(uploadId: string): Promise<AnalysisResponse> {
  const response = await api.get<AnalysisResponse>(`/analysis/${uploadId}`);
  return response.data;
}

export async function pollAnalysis(
  uploadId: string,
  onProgress?: (status: string) => void,
  maxAttempts = 30,
  interval = 2000
): Promise<AnalysisResponse> {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const result = await getAnalysis(uploadId);

    if (onProgress) {
      onProgress(result.status);
    }

    if (result.status === 'completed') {
      return result;
    }

    if (result.status === 'failed') {
      throw new Error(result.error || 'Analysis failed');
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
    attempts++;
  }

  throw new Error('Analysis timeout - please try again');
}

export async function getAlbums(): Promise<AlbumSummary[]> {
  const response = await api.get<{ albums: AlbumSummary[] }>('/albums');
  return response.data.albums;
}

export async function createAlbum(name: string): Promise<AlbumSummary> {
  const response = await api.post<{ album: AlbumSummary }>('/albums', { name });
  return response.data.album;
}

export async function getAlbum(albumId: string): Promise<AlbumDetail> {
  const response = await api.get<{ album: AlbumDetail }>(`/albums/${albumId}`);
  return response.data.album;
}

export async function deleteAlbum(albumId: string): Promise<void> {
  await api.delete(`/albums/${albumId}`);
}

export async function addProductToAlbum(
  albumId: string,
  payload: {
    productId: string;
    notes?: string;
    savedFromUploadId?: string;
    detectedCategory?: string;
    detectedColor?: string;
  }
): Promise<AlbumDetail> {
  const response = await api.post<{ album: AlbumDetail }>(`/albums/${albumId}/items`, payload);
  return response.data.album;
}

export async function removeAlbumItem(albumId: string, itemId: string): Promise<void> {
  await api.delete(`/albums/${albumId}/items/${itemId}`);
}

export async function getPublishedCollections(): Promise<PublishedCollectionsResponse> {
  const response = await api.get<PublishedCollectionsResponse>('/collections');
  return response.data;
}

export async function getPublishedCollection(collectionId: string): Promise<CuratedCollection> {
  const response = await api.get<{ collection: CuratedCollection }>(`/collections/${collectionId}`);
  return response.data.collection;
}

export async function getPublishedLooks(): Promise<CuratedLookSummary[]> {
  const response = await api.get<{ looks: CuratedLookSummary[] }>('/looks');
  return response.data.looks;
}

export async function getPublishedLook(lookId: string): Promise<CuratedLook> {
  const response = await api.get<{ look: CuratedLook }>(`/looks/${lookId}`);
  return response.data.look;
}

export async function getAdminLooks(): Promise<CuratedLook[]> {
  const response = await api.get<{ looks: CuratedLook[] }>('/admin/looks');
  return response.data.looks;
}

export async function createAdminLook(formData: FormData): Promise<CuratedLook> {
  const response = await api.post<{ look: CuratedLook }>('/admin/looks', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.look;
}

export async function updateAdminLook(lookId: string, formData: FormData): Promise<CuratedLook> {
  const response = await api.put<{ look: CuratedLook }>(`/admin/looks/${lookId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.look;
}

export async function deleteAdminLook(lookId: string): Promise<void> {
  await api.delete(`/admin/looks/${lookId}`);
}

export async function getAdminCollections(): Promise<CuratedCollectionSummary[]> {
  const response = await api.get<{ collections: CuratedCollectionSummary[] }>('/admin/collections');
  return response.data.collections;
}

export async function createAdminCollection(
  name: string,
  published = true,
): Promise<CuratedCollectionSummary> {
  const response = await api.post<{ collection: CuratedCollectionSummary }>('/admin/collections', {
    name,
    published,
  });
  return response.data.collection;
}

export async function updateAdminCollection(
  collectionId: string,
  payload: { name?: string; published?: boolean },
): Promise<CuratedCollectionSummary> {
  const response = await api.put<{ collection: CuratedCollectionSummary }>(
    `/admin/collections/${collectionId}`,
    payload,
  );
  return response.data.collection;
}

export async function deleteAdminCollection(collectionId: string): Promise<void> {
  await api.delete(`/admin/collections/${collectionId}`);
}

export async function getClosetItems(): Promise<ClosetItem[]> {
  const response = await api.get<{ items: ClosetItem[] }>('/closet/items');
  return response.data.items;
}

export async function createClosetItem(formData: FormData): Promise<ClosetItem> {
  const response = await api.post<{ item: ClosetItem }>('/closet/items', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.item;
}

export async function deleteClosetItem(itemId: string): Promise<void> {
  await api.delete(`/closet/items/${itemId}`);
}

export async function updateClosetItem(itemId: string, formData: FormData): Promise<ClosetItem> {
  const response = await api.patch<{ item: ClosetItem }>(`/closet/items/${itemId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.item;
}

export async function getOutfits(): Promise<Outfit[]> {
  const response = await api.get<{ outfits: Outfit[] }>('/closet/outfits');
  return response.data.outfits;
}

export async function createOutfit(name: string, itemIds: string[]): Promise<Outfit> {
  const response = await api.post<{ outfit: Outfit }>('/closet/outfits', { name, itemIds });
  return response.data.outfit;
}

export async function deleteOutfit(outfitId: string): Promise<void> {
  await api.delete(`/closet/outfits/${outfitId}`);
}

export async function shareOutfit(outfitId: string): Promise<{ outfit: Outfit; shareId: string }> {
  const response = await api.post<{ outfit: Outfit; shareId: string }>(`/closet/outfits/${outfitId}/share`);
  return response.data;
}

export async function getSharedOutfit(shareId: string): Promise<SharedOutfit> {
  const response = await api.get<{ outfit: SharedOutfit }>(`/share/outfits/${shareId}`);
  return response.data.outfit;
}

export default api;
