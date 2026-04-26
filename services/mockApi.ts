/**
 * Mock API — 백엔드 부재 가정.
 * - 네트워크 지연 시뮬: 300~800ms
 * - 좋아요 mutation 10% 실패 시뮬 (낙관적 롤백 데모용)
 * - JWT는 토큰-모양 문자열 (실제 서명 없음)
 */
import type { Post, User } from "@/types";

const NETWORK_DELAY_MS = 500;
const LIKE_FAIL_RATE = 0.1;
const PAGE_SIZE = 10;
const TOTAL_POSTS = 50;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const CAPTIONS = [
    "오늘도 좋은 하루 ☀️",
    "새로운 시작 🚀",
    "코딩하는 날들 💻",
    "개발자의 하루",
    "React Native 재밌다!",
    "Expo 최고야 📱",
    "모바일 개발 입문 중",
    "커피 한 잔이면 충분해 ☕",
    "오늘도 배운다",
    "성장하는 중 🌱",
];

// 서버 측 데이터 — 모듈 스코프 가변 상태 (mutation이 실제 데이터 변경하는 모양 시뮬)
const SERVER_POSTS: Post[] = Array.from({ length: TOTAL_POSTS }, (_, i) => ({
    id: String(i + 1),
    user: {
        id: String((i % 10) + 1),
        username: `user_${(i % 10) + 1}`,
        avatar: `https://picsum.photos/seed/avatar${i % 10}/200/200`,
        followersCount: ((i % 10) + 1) * 37,
        followingCount: ((i % 10) + 1) * 12,
        postsCount: (i % 10) + 3,
    },
    imageUrl: `https://picsum.photos/seed/post${i + 10}/600/600`,
    caption: CAPTIONS[i % CAPTIONS.length],
    likes: (i + 1) * 11,
    likedByMe: i % 3 === 0,
    commentsCount: (i % 10) * 2 + 1,
    createdAt: new Date(Date.now() - i * 3_600_000).toISOString(),
}));

// ─── Feed ────────────────────────────────────────────

export type FeedPage = {
    posts: Post[];
    nextCursor: number | null;
};

export async function fetchFeedPage(pageParam: number): Promise<FeedPage> {
    await delay(NETWORK_DELAY_MS);
    const start = pageParam * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const posts = SERVER_POSTS.slice(start, end).map((p) => ({ ...p }));
    const nextCursor = end < SERVER_POSTS.length ? pageParam + 1 : null;
    return { posts, nextCursor };
}

export async function fetchPostById(id: string): Promise<Post> {
    await delay(NETWORK_DELAY_MS / 2);
    const post = SERVER_POSTS.find((p) => p.id === id);
    if (!post) throw new Error(`Post ${id} 없음`);
    return { ...post };
}

// ─── Like Mutation (10% 실패 시뮬) ──────────────────

export type ToggleLikeResult = {
    postId: string;
    liked: boolean;
    likes: number;
};

export async function toggleLike(
    postId: string,
    currentlyLiked: boolean
): Promise<ToggleLikeResult> {
    await delay(NETWORK_DELAY_MS);
    if (Math.random() < LIKE_FAIL_RATE) {
        throw new Error("좋아요 처리 실패 (네트워크 시뮬)");
    }
    const post = SERVER_POSTS.find((p) => p.id === postId);
    if (!post) throw new Error(`Post ${postId} 없음`);
    post.likedByMe = !currentlyLiked;
    post.likes += post.likedByMe ? 1 : -1;
    return { postId, liked: post.likedByMe, likes: post.likes };
}

// ─── Auth (모의 JWT) ─────────────────────────────────

export type AuthUser = User & { email: string };
export type AuthResponse = { token: string; user: AuthUser };

/**
 * 모의 JWT — base64 인코딩 없이 평문. 실제 서명 검증 없음.
 * 형식: "mock.{email}.{expiresAt}"
 * Phase 3에서 실서버 JWT로 교체.
 */
function makeMockToken(email: string): string {
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7일
    return `mock.${email}.${expiresAt}`;
}

export function parseMockToken(
    token: string
): { email: string; expiresAt: number } | null {
    const parts = token.split(".");
    if (parts.length !== 3 || parts[0] !== "mock") return null;
    const expiresAt = Number(parts[2]);
    if (!Number.isFinite(expiresAt)) return null;
    return { email: parts[1], expiresAt };
}

export function isTokenExpired(token: string): boolean {
    const parsed = parseMockToken(token);
    if (!parsed) return true;
    return Date.now() >= parsed.expiresAt;
}

export async function login(
    email: string,
    password: string
): Promise<AuthResponse> {
    await delay(800);
    if (!email.includes("@")) throw new Error("올바른 이메일 형식 아님");
    if (password.length < 4) throw new Error("비밀번호 4자 이상");
    const username = email.split("@")[0];
    return {
        token: makeMockToken(email),
        user: {
            id: "me",
            email,
            username,
            avatar: `https://picsum.photos/seed/${username}/200/200`,
            followersCount: 128,
            followingCount: 64,
            postsCount: 12,
        },
    };
}

export async function signup(
    email: string,
    password: string,
    username: string
): Promise<AuthResponse> {
    await delay(800);
    if (!email.includes("@")) throw new Error("올바른 이메일 형식 아님");
    if (password.length < 8) throw new Error("비밀번호 8자 이상");
    if (username.length < 2) throw new Error("유저명 2자 이상");
    return {
        token: makeMockToken(email),
        user: {
            id: "me",
            email,
            username,
            avatar: `https://picsum.photos/seed/${username}/200/200`,
            followersCount: 0,
            followingCount: 0,
            postsCount: 0,
        },
    };
}

export async function fetchMe(token: string): Promise<AuthUser> {
    await delay(NETWORK_DELAY_MS / 2);
    const parsed = parseMockToken(token);
    if (!parsed) throw new Error("토큰 파싱 실패");
    if (isTokenExpired(token)) throw new Error("토큰 만료");
    const username = parsed.email.split("@")[0];
    return {
        id: "me",
        email: parsed.email,
        username,
        avatar: `https://picsum.photos/seed/${username}/200/200`,
        followersCount: 128,
        followingCount: 64,
        postsCount: 12,
    };
}
