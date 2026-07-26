import { QueryClient } from '@tanstack/react-query';

// Heavy image payloads (base64 in JSON) are cached in memory so navigating
// between pages does not refetch on every visit. staleTime keeps data fresh
// for 30 minutes; gcTime retains it for an hour after last use.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
