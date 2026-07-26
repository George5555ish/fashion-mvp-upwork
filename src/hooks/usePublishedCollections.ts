import { useQuery } from '@tanstack/react-query';
import { getPublishedCollections } from '../services/api';
import { queryKeys } from '../lib/queryKeys';

export function usePublishedCollections() {
  return useQuery({
    queryKey: queryKeys.publishedCollections,
    queryFn: getPublishedCollections,
  });
}
