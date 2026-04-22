---
module: types-constants
path: types/, constants/
keywords: typescript, types, mock-data, constants, interfaces
---

# Types & Constants Module ★

#module-types #module-constants

---

## Purpose

`types/`: TypeScript 타입 정의 (도메인 모델).
`constants/`: 정적 값 — 색상, 아이콘, 이미지, **목 데이터**.

---

## Key Files

| 파일 | 역할 |
|------|------|
| `types/index.ts` | `User`, `Post`, `Comment` 타입 |
| `constants/mockData.ts` | `MOCK_POSTS`, `MOCK_ME`, `MOCK_COMMENTS` |
| `constants/icons.ts` | 아이콘 require 맵 (레거시) |
| `constants/images.ts` | 이미지 require 맵 (레거시) |
| `interfaces/interfaces.d.ts` | 영화 관련 타입 (레거시) |

---

## 도메인 타입

```typescript
// types/index.ts
interface User {
  id: string;
  username: string;
  avatar: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  likedByMe: boolean;    // ← 낙관적 업데이트의 핵심 필드
  commentsCount: number;
  createdAt: string;
}

interface Comment {
  id: string;
  user: Pick<User, "id" | "username" | "avatar">;  // 필요한 필드만
  text: string;
  createdAt: string;
}
```

> [!tip]
> `likedByMe` 필드: Phase 2 낙관적 업데이트 시 서버 응답 전에 즉시 반전시켜
> UI를 빠르게 업데이트하는 패턴에 사용됨.

---

## 목 데이터 구조

```typescript
// constants/mockData.ts
export const MOCK_POSTS: Post[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  imageUrl: `https://picsum.photos/seed/post${i}/600/600`,
  // ...
}));
```

> [!tip]
> `picsum.photos/seed/{key}/w/h` — seed 값이 같으면 항상 동일한 이미지 반환.
> 목 데이터에서 일관된 이미지 사용에 유용.

---

## Phase 2 타입 확장 예정

```typescript
// 추가 예정
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface PaginatedFeed {
  posts: Post[];
  nextCursor: string | null;   // useInfiniteQuery cursor
  hasMore: boolean;
}
```

---

## Related Notes
- [[Screens Module]]
- [[Components Module]]
- [[Services Module]]
