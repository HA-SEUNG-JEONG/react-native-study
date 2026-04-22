---
module: architecture
path: 01-Architecture
keywords: navigation, expo-router, stack, tabs, deep-linking, modal
---

# Navigation Flow ★★★

#arch-expo-router #pattern-navigation

---

## Expo Router 핵심 원칙

> [!important]
> **파일 = 라우트**. `app/post/[id].tsx` 파일이 존재하면 `/post/123` 경로가 자동 생성됨.
> 별도 라우트 등록 불필요 — 웹 Next.js App Router와 동일한 DX.

---

## 라우트 타입별 파일명 규칙

| 파일명 | 라우트 | 설명 |
|--------|--------|------|
| `index.tsx` | `/` 또는 그룹 루트 | 기본 화면 |
| `search.tsx` | `/search` | 정적 라우트 |
| `[id].tsx` | `/:id` | 동적 파라미터 |
| `_layout.tsx` | (레이아웃) | URL 노출 안 됨 |
| `(tabs)/` | (그룹) | URL에 `tabs` 미포함 |

---

## 네비게이션 API

```typescript
import { useRouter, useLocalSearchParams } from "expo-router";

const router = useRouter();

router.push("/post/123");          // 스택에 추가 (뒤로가기 가능)
router.replace("/auth/login");     // 현재 화면 교체 (뒤로가기 불가)
router.back();                     // 뒤로가기
router.push("/(tabs)/search");     // 탭 그룹 내 화면으로 이동

// 동적 파라미터 읽기 ([id].tsx에서)
const { id } = useLocalSearchParams<{ id: string }>();
```

> [!tip]
> `router.replace`는 인증 후 로그인 화면 제거, 온보딩 완료 후 사용.
> `router.push`는 일반 화면 전환.

---

## Stack vs Tabs: 언제 무엇을?

```text
Tabs: 앱의 주요 섹션 전환 (Feed ↔ Search ↔ Profile)
      → 탭 바 항상 표시, 상태 유지됨

Stack: 상세 화면, 폼, 모달
      → 헤더 + 뒤로가기 제스처
      → 이전 화면 위에 쌓임

Modal: 로그인, 설정, 선택 시트
      → 아래에서 올라오는 시트
      → options={{ presentation: "modal" }}
```

---

## 현재 프로젝트 네비게이션 맵

```text
앱 실행
  └─ RootLayout (_layout.tsx)
       ├─ (tabs) ─── TabBar 표시
       │    ├─ [홈 탭]    → Feed (index.tsx)
       │    ├─ [검색 탭]  → Search (search.tsx)
       │    └─ [프로필]   → Profile (profile.tsx)
       │
       ├─ /post/[id]  ← router.push("/post/1")
       │    └─ PostDetailScreen
       │
       └─ /auth/login   ← router.push("/auth/login")  [modal]
            └─ LoginScreen
                 └─ router.replace("/auth/signup")
```

---

## `app/_layout.tsx` — Stack 설정 해설

```typescript
<Stack>
  {/* (tabs) 전체가 Stack의 한 화면 */}
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

  {/* 동적 라우트 — 파일명 [id] 그대로 등록 */}
  <Stack.Screen name="post/[id]" options={{ headerShown: false }} />

  {/* modal: 아래서 올라오는 시트 형태 */}
  <Stack.Screen
    name="auth/login"
    options={{ presentation: "modal", headerShown: false }}
  />
</Stack>
```

> [!warning]
> `Stack.Screen` 을 명시하지 않아도 파일만 있으면 라우트는 동작함.
> 단, `presentation: "modal"` 같은 옵션 커스텀은 명시 필요.

---

## 탭 숨기기 (href: null)

```typescript
// saved.tsx 파일은 있지만 탭 바에 표시 안 함
<Tabs.Screen name="saved" options={{ href: null }} />
```

---

## Related Notes
- [[System Architecture]]
- [[Screens Module]]
