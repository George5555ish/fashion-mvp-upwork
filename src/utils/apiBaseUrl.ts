const PRODUCTION_API_ORIGIN =
  'https://fashion-mvp-upwork-server-production.up.railway.app';

export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_URL?.trim();

  if (envUrl) {
    return envUrl.endsWith('/api') ? envUrl : `${envUrl.replace(/\/$/, '')}/api`;
  }

  if (import.meta.env.DEV) {
    return '/api';
  }

  return `${PRODUCTION_API_ORIGIN}/api`;
}
