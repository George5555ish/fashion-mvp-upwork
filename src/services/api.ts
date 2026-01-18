import axios from 'axios';

// Determine API base URL
// In production without explicit URL, use relative path
// In development, use proxy via /api or explicit localhost
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  
  if (envUrl) {
    // If explicitly set, use it (make sure it includes /api if needed)
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
  }
  
  // In development, use proxy
  if (import.meta.env.DEV) {
    return '/api';
  }
  
  // In production, use relative path (assuming same domain or reverse proxy)
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
}

export interface AnalysisResponse {
  uploadId: string;
  status: string;
  uploadDate: string;
  imageBase64: string;
  imageMimeType: string;
  detectedItems: DetectedItem[];
  analysisResults: any;
  error?: string;
}

/**
 * Upload an image file
 */
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

/**
 * Get analysis results for an upload
 */
export async function getAnalysis(uploadId: string): Promise<AnalysisResponse> {
  const response = await api.get<AnalysisResponse>(`/analysis/${uploadId}`);
  return response.data;
}

/**
 * Poll for analysis results until complete
 */
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

    await new Promise(resolve => setTimeout(resolve, interval));
    attempts++;
  }

  throw new Error('Analysis timeout - please try again');
}

export default api;
