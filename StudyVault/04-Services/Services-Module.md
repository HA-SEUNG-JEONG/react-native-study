---
module: services
path: services/
keywords: useFetch, custom-hook, API, data-fetching, react-query
---

# Services Module ★★

#module-services #pattern-custom-hook

---

## Purpose

`services/` 폴더: 데이터 패칭 로직. UI와 데이터 소스 분리.
현재 Phase 1은 `useFetch` 커스텀 훅 + TMDB API 구조.
**Phase 2에서 React Query + Zustand로 교체 예정**.

---

## Key Files

| 파일 | 역할 |
|------|------|
| `services/useFetch.ts` | 범용 데이터 패칭 훅 (loading/error/data 상태) |
| `services/api.ts` | TMDB API 호출 함수 |
| `services/appwrite.ts` | Appwrite 백엔드 (검색 횟수 추적) |

---

## useFetch 훅 해설

```typescript
const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  autoFetch = true     // false면 수동 실행 (검색에 사용)
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  // ...
  return { data, error, loading, refetch, reset };
};
```

**사용 패턴:**

```typescript
// 자동 패칭
const { data, loading, error } = useFetch(() => fetchMovies({ query: "" }));

// 수동 패칭 (검색)
const { data, loading, refetch, reset } = useFetch(
  () => fetchMovies({ query: searchQuery }),
  false   // autoFetch = false
);
```

---

## Phase 1 vs Phase 2 데이터 레이어 비교

```text
Phase 1 (현재)                      Phase 2 (예정)
──────────────────────              ──────────────────────
useFetch 커스텀 훅                   @tanstack/react-query
useState(local)                     useInfiniteQuery (페이지네이션)
직접 fetch()                        QueryClient + QueryKey
수동 로딩/에러 상태                  자동 캐싱 + staleTime
낙관적 업데이트 없음                 useMutation + onMutate

zustand 없음                        useAuthStore (전역 상태)
토큰 없음                           JWT + SecureStore
```

> [!tip]
> `useFetch`를 먼저 이해하면 React Query가 **무엇을 자동화하는지** 명확해짐.
> Phase 2 학습 전 이 훅을 직접 분석할 것.

---

## Internal Flow

```text
컴포넌트에서 useFetch 호출
  ↓
autoFetch=true → useEffect에서 fetchData() 즉시 실행
  ↓
setLoading(true)
  ↓
fetchFunction() (비동기 API 호출)
  ↓ 성공      ↓ 실패
setData(result)  setError(err)
  ↓
setLoading(false)
  ↓
컴포넌트 리렌더 (data/error/loading 변경)
```

---

## Dependencies

| 방향 | 모듈 | 경로 |
|------|------|------|
| **Uses** | TMDB API (외부) | `https://api.themoviedb.org` |
| **Uses** | Appwrite (외부) | `appwrite SDK` |
| **Used by** | Search Screen (레거시) | `app/(tabs)/search.tsx` |
| **Phase 2** | React Query로 교체 | `@tanstack/react-query` |

---

## Configuration

| 환경 변수 | 역할 | 파일 |
|----------|------|------|
| `EXPO_PUBLIC_MOVIE_API_KEY` | TMDB API 인증 | `.env` |
| `EXPO_PUBLIC_APPWRITE_*` | Appwrite 연결 정보 | `.env` |

> [!warning]
> Expo에서 클라이언트 환경변수는 반드시 `EXPO_PUBLIC_` 접두사 필요.
> 없으면 빌드에 포함되지 않음.

---

## Related Notes
- [[Screens Module]]
- [[System Architecture]]
