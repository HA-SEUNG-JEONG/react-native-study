import { QueryClient } from "@tanstack/react-query";

/**
 * 전역 QueryClient.
 * - staleTime: 30s — 같은 쿼리 30초 내 재호출 시 네트워크 안 탐
 * - gcTime: 5min — 비활성 쿼리 캐시 보관 시간
 * - retry: 1 — 실패 시 1회 재시도 (좋아요 mutation은 onError로 처리)
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000,
            gcTime: 5 * 60_000,
            retry: 1,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 0,
        },
    },
});
