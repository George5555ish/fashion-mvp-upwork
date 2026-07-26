import { useQuery } from '@tanstack/react-query';
import { getAnalysis } from '../services/api';
import { queryKeys } from '../lib/queryKeys';

export function useAnalysis(uploadId?: string) {
  return useQuery({
    queryKey: queryKeys.analysis(uploadId!),
    queryFn: () => getAnalysis(uploadId!),
    enabled: Boolean(uploadId),
    refetchInterval: (query) => (
      query.state.data?.status === 'processing' ? 2000 : false
    ),
  });
}
