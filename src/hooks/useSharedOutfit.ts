import { useQuery } from '@tanstack/react-query';
import { getSharedOutfit } from '../services/api';
import { queryKeys } from '../lib/queryKeys';

export function useSharedOutfit(shareId?: string) {
  return useQuery({
    queryKey: queryKeys.sharedOutfit(shareId!),
    queryFn: () => getSharedOutfit(shareId!),
    enabled: Boolean(shareId),
  });
}
