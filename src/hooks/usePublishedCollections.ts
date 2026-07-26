import { useQuery } from '@tanstack/react-query';
import { getPublishedCollections } from '../services/api';
import { queryKeys } from '../lib/queryKeys';

const COLLECTIONS_CACHE_MS = 30 * 60 * 1000;

export function usePublishedCollections() {
  return useQuery({
    queryKey: queryKeys.publishedCollections,
    queryFn: getPublishedCollections,
    staleTime: COLLECTIONS_CACHE_MS,
    gcTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}