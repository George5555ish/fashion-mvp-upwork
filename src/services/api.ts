import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
