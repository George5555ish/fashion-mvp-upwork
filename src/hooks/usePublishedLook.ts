import { useQuery } from '@tanstack/react-query';
import { getPublishedLook } from '../services/api';
import { queryKeys } from '../lib/queryKeys';

export function usePublishedLook(lookId: string | null) {
  return useQuery({
    queryKey: queryKeys.publishedLook(lookId!),
    queryFn: () => getPublishedLook(lookId!),
    enabled: Boolean(lookId),
  });
}
