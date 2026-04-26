/**
 * 피드/포스트/좋아요 RQ 훅 모음.
 * 화면에서 직접 useInfiniteQuery 쓰기보다 여기로 추상화 → 키 일관성 + 테스트 용이.
 */
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
    type InfiniteData,
} from "@tanstack/react-query";
import {
    fetchFeedPage,
    fetchPostById,
    toggleLike,
    type FeedPage,
} from "@/services/mockApi";
import type { Post } from "@/types";

export const feedKeys = {
    all: ["feed"] as const,
    list: () => [...feedKeys.all, "list"] as const,
    detail: (id: string) => [...feedKeys.all, "detail", id] as const,
};

// ─── 피드 무한 스크롤 ──────────────────────────────

export function useFeed() {
    return useInfiniteQuery<
        FeedPage,
        Error,
        InfiniteData<FeedPage>,
        readonly string[],
        number
    >({
        queryKey: feedKeys.list(),
        queryFn: ({ pageParam }) => fetchFeedPage(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
}

// ─── 단일 포스트 ──────────────────────────────────

export function usePost(id: string) {
    return useQuery({
        queryKey: feedKeys.detail(id),
        queryFn: () => fetchPostById(id),
        enabled: !!id,
    });
}

// ─── 낙관적 좋아요 mutation ─────────────────────────

type LikeVars = { postId: string; currentlyLiked: boolean };

export function useToggleLike() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, currentlyLiked }: LikeVars) =>
            toggleLike(postId, currentlyLiked),

        onMutate: async ({ postId, currentlyLiked }) => {
            // 1. 진행 중인 피드 쿼리 취소 (race 방지)
            await qc.cancelQueries({ queryKey: feedKeys.list() });
            await qc.cancelQueries({ queryKey: feedKeys.detail(postId) });

            // 2. 롤백용 스냅샷
            const prevFeed = qc.getQueryData<InfiniteData<FeedPage>>(
                feedKeys.list()
            );
            const prevDetail = qc.getQueryData<Post>(feedKeys.detail(postId));

            // 3. 낙관적 업데이트 — 피드 (모든 페이지 순회)
            if (prevFeed) {
                qc.setQueryData<InfiniteData<FeedPage>>(feedKeys.list(), {
                    ...prevFeed,
                    pages: prevFeed.pages.map((page) => ({
                        ...page,
                        posts: page.posts.map((p) =>
                            p.id === postId
                                ? {
                                      ...p,
                                      likedByMe: !currentlyLiked,
                                      likes: currentlyLiked
                                          ? p.likes - 1
                                          : p.likes + 1,
                                  }
                                : p
                        ),
                    })),
                });
            }

            // 4. 낙관적 업데이트 — 단일 포스트
            if (prevDetail) {
                qc.setQueryData<Post>(feedKeys.detail(postId), {
                    ...prevDetail,
                    likedByMe: !currentlyLiked,
                    likes: currentlyLiked
                        ? prevDetail.likes - 1
                        : prevDetail.likes + 1,
                });
            }

            return { prevFeed, prevDetail };
        },

        onError: (_err, { postId }, ctx) => {
            // 롤백
            if (ctx?.prevFeed) {
                qc.setQueryData(feedKeys.list(), ctx.prevFeed);
            }
            if (ctx?.prevDetail) {
                qc.setQueryData(feedKeys.detail(postId), ctx.prevDetail);
            }
        },

        onSuccess: (data) => {
            // 서버 진실값으로 동기화 (낙관적 값과 일치하지만 명시적 sync)
            qc.setQueryData<Post | undefined>(
                feedKeys.detail(data.postId),
                (old) =>
                    old
                        ? { ...old, likedByMe: data.liked, likes: data.likes }
                        : old
            );
        },
    });
}
