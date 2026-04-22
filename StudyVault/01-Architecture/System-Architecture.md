---
module: architecture
path: 01-Architecture
keywords: architecture, expo-router, file-based-routing, react-native, layered
---

# System Architecture ★★★

#arch-expo-router #arch-component

---

## 전체 구조

```text
rn-movie/
├── app/                    ← 라우트 = 화면 (Expo Router)
│   ├── _layout.tsx         ← 루트 Stack + SafeAreaProvider
│   ├── (tabs)/             ← 탭 그룹 (괄호 = URL에 노출 안 됨)
│   │   ├── _layout.tsx     ← 탭 바 정의
│   │   ├── index.tsx       ← /  (Feed)
│   │   ├── search.tsx      ← /search
│   │   └── profile.tsx     ← /profile
│   ├── post/[id].tsx       ← /post/:id (동적 라우트)
│   └── auth/
│       ├── login.tsx       ← /auth/login (modal)
│       └── signup.tsx      ← /auth/signup (modal)
│
├── components/             ← 재사용 UI 조각
├── services/               ← 데이터 패칭 / API
├── constants/              ← 정적 값 / 목 데이터
└── types/                  ← TypeScript 타입
```

---

## 아키텍처 패턴

> [!important]
> Expo Router는 **파일 = 라우트** 원칙. 웹의 Next.js App Router와 동일한 개념을 모바일에 적용.

| 개념 | 웹 (Next.js) | RN (Expo Router) |
|------|-------------|-----------------|
| 라우트 그룹 | `(group)/` | `(group)/` — URL 비노출 |
| 동적 라우트 | `[id]/page.tsx` | `[id].tsx` |
| 레이아웃 | `layout.tsx` | `_layout.tsx` |
| 중첩 네비게이션 | nested layouts | Stack 안에 Tabs |

---

## 레이어 구조

```text
┌─────────────────────────────────────┐
│            Screen Layer             │  app/*.tsx
│   (Expo Router 파일 기반 라우트)      │
├─────────────────────────────────────┤
│          Component Layer            │  components/*.tsx
│   (재사용 UI — PostCard, SearchBar)  │
├─────────────────────────────────────┤
│           Service Layer             │  services/*.ts
│   (useFetch, API 호출)               │
├─────────────────────────────────────┤
│        Data / Constants Layer       │  constants/, types/
│   (목 데이터, TypeScript 타입)        │
└─────────────────────────────────────┘
```

---

## 네비게이션 계층

```text
RootLayout (Stack)
├── (tabs) Group
│   ├── TabLayout (Tabs)
│   │   ├── Feed Screen        (index.tsx)
│   │   ├── Search Screen      (search.tsx)
│   │   └── Profile Screen     (profile.tsx)
│   └── saved.tsx → redirect
├── post/[id]                  (Stack push)
├── auth/login                 (modal presentation)
└── auth/signup                (modal presentation)
```

> [!tip]
> Stack 안에 Tabs가 중첩된 구조. `(tabs)`는 Stack의 한 화면처럼 동작하고,
> 그 안에서 탭 전환이 일어남. `post/[id]`는 Tabs 위에 스택으로 쌓임.

---

## 데이터 흐름 (Phase 1 현재)

```text
constants/mockData.ts
    ↓ import
Screen Component (useState)
    ↓ props
PostCard Component
    ↓ 이벤트
router.push() / onLike()
    ↓
화면 전환 / 상태 업데이트
```

> [!warning]
> **Phase 2에서 변경됨**: mockData → React Query + 실제 API
> useState(local) → Zustand(global) + useInfiniteQuery

---

## Related Notes
- [[Navigation Flow]]
- [[Screens Module]]
- [[Config Module]]
