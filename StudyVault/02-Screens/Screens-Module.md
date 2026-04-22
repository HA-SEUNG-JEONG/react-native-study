---
module: screens
path: app/
keywords: screens, expo-router, safe-area, flatlist, keyboard-avoiding
---

# Screens Module ★★★

#module-screens #pattern-safe-area #pattern-flatlist #pattern-keyboard

---

## Purpose

`app/` 폴더 내 모든 `.tsx` 파일이 라우트 = 화면. Expo Router가 파일 구조를 읽어 네비게이션 트리 자동 생성.

---

## Key Files

| 파일 | 역할 |
|------|------|
| `app/_layout.tsx` | 루트 Stack + SafeAreaProvider 마운트 |
| `app/(tabs)/_layout.tsx` | 탭 바 (Feed/Search/Profile) |
| `app/(tabs)/index.tsx` | **Feed** — FlatList + 좋아요 상태 |
| `app/(tabs)/search.tsx` | **Search** — TextInput 실시간 필터 |
| `app/(tabs)/profile.tsx` | **Profile** — 프로필 헤더 + 3열 그리드 |
| `app/(tabs)/saved.tsx` | Redirect → profile |
| `app/post/[id].tsx` | **Post Detail** — Stack 상세, `useLocalSearchParams` |
| `app/auth/login.tsx` | **Login** — KeyboardAvoidingView 폼 |
| `app/auth/signup.tsx` | **Signup** — KeyboardAvoidingView 폼 |

---

## 패턴 1: Safe Area 처리

> [!important]
> RN에서 노치(iPhone), 홈바, 상태바는 자동으로 회피되지 않음.
> 반드시 직접 처리해야 함.

```typescript
// 방법 A: useSafeAreaInsets (권장 — 배경색 전체 화면 가능)
import { useSafeAreaInsets } from "react-native-safe-area-context";

const insets = useSafeAreaInsets();
<View style={{ paddingTop: insets.top }}>...</View>

// 방법 B: SafeAreaView (간단하지만 배경색 제한)
import { SafeAreaView } from "react-native-safe-area-context";
<SafeAreaView className="flex-1 bg-primary">...</SafeAreaView>
```

**전제 조건**: `app/_layout.tsx`에 `<SafeAreaProvider>` 루트에 마운트 필요.

---

## 패턴 2: FlatList vs ScrollView

```text
ScrollView                      FlatList
──────────────────────          ──────────────────────
전체 아이템 한 번에 렌더         화면에 보이는 것만 렌더
적은 고정 항목에 적합           동적 리스트에 필수
내부에 FlatList 넣기 불가       keyExtractor 필수 (string)
```

```typescript
<FlatList
  data={posts}
  keyExtractor={(item) => item.id}          // string 반환 필수
  renderItem={({ item }) => <PostCard post={item} />}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
/>
```

> [!warning]
> `keyExtractor`는 반드시 **string**을 반환해야 함.
> 숫자 id면 `.toString()` 필요.

---

## 패턴 3: KeyboardAvoidingView (폼 화면)

```typescript
import { KeyboardAvoidingView, Platform } from "react-native";

<KeyboardAvoidingView
  className="flex-1 bg-primary"
  // iOS: padding 추가, Android: 높이 줄임
  behavior={Platform.OS === "ios" ? "padding" : "height"}
>
  <ScrollView keyboardShouldPersistTaps="handled">
    {/* 폼 컨텐츠 */}
  </ScrollView>
</KeyboardAvoidingView>
```

> [!tip]
> `keyboardShouldPersistTaps="handled"`: 스크롤 중 버튼 탭 시 키보드 유지.
> 없으면 탭 한 번은 키보드만 닫히고 버튼 동작 안 함.

---

## 패턴 4: TextInput (웹 input과 다른 점)

```typescript
<TextInput
  value={email}
  onChangeText={setEmail}          // onChange 아님 — text string 직접 전달
  keyboardType="email-address"     // 이메일 키보드
  autoCapitalize="none"            // 자동 대문자 방지
  returnKeyType="next"             // 엔터 버튼 레이블
  secureTextEntry                  // 비밀번호 마스킹 (boolean prop)
  clearButtonMode="while-editing"  // iOS 전용 x 버튼
/>
```

---

## 패턴 5: 동적 라우트 파라미터

```typescript
// app/post/[id].tsx
import { useLocalSearchParams } from "expo-router";

const { id } = useLocalSearchParams<{ id: string }>();
// → /post/123 접근 시 id = "123"
```

---

## Internal Flow (Feed Screen)

```text
FeedScreen 마운트
  ↓
useState(MOCK_POSTS) → posts 초기화
  ↓
useSafeAreaInsets → insets.top으로 상단 padding
  ↓
FlatList 렌더
  ↓ renderItem
PostCard (post, onLike) → 좋아요 탭
  ↓ onLike(postId)
setPosts(prev → 토글) → 리렌더
```

---

## Dependencies

| 방향 | 모듈 / 패키지 | 경로 |
|------|--------------|------|
| **Uses** | PostCard | `@/components/PostCard` |
| **Uses** | mockData | `@/constants/mockData` |
| **Uses** | types | `@/types` |
| **Uses** | expo-router | `useRouter`, `useLocalSearchParams` |
| **Uses** | react-native-safe-area-context | `useSafeAreaInsets` |

---

## Related Notes
- [[Navigation Flow]]
- [[Components Module]]
- [[System Architecture]]
