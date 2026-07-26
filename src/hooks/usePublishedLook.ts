import { useQuery } from '@tanstack/react-query';
import { getPublishedLook } from '../services/api';
import { queryKeys } from '../lib/queryKeys';

const LOOK_CACHE_MS = 30 * 60 * 1000;

export function usePublishedLook(lookId: string | null) {
  return useQuery({
    queryKey: queryKeys.publishedLook(lookId!),
    queryFn: () => getPublishedLook(lookId!),
    enabled: Boolean(lookId),
    staleTime: LOOK_CACHE_MS,
    gcTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}