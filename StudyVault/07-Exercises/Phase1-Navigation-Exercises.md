---
module: exercises
path: 07-Exercises
keywords: practice, navigation, styling, safe-area, flatlist, keyboard
---

# Phase 1 — Navigation & Styling 실습 문제

#practice #onboarding #module-screens #pattern-flatlist #pattern-safe-area

## Related Modules
- [[Screens Module]]
- [[Navigation Flow]]
- [[Components Module]]
- [[Config Module]]

---

## Exercise 1 — Code Reading [trace]

> Feed 화면에서 게시물 이미지를 탭했을 때 어떤 일이 일어나는지 추적하라.
> 관련 파일과 함수를 순서대로 나열하라.

> [!answer]- 정답 보기
> 1. `components/PostCard.tsx` → `<Pressable onPress={() => router.push(\`/post/${post.id}\`)}>` — 이미지 래핑 Pressable 탭
> 2. `expo-router` `useRouter().push()` → Expo Router가 `/post/[id]` 라우트 매칭
> 3. `app/_layout.tsx` → `<Stack.Screen name="post/[id]">` — 등록된 Stack 화면으로 전환
> 4. `app/post/[id].tsx` → `useLocalSearchParams<{ id: string }>()` — URL에서 id 추출
> 5. `constants/mockData.ts` → `MOCK_POSTS.find(p => p.id === id)` — 해당 게시물 조회
> 6. ScrollView로 게시물 상세 렌더

---

## Exercise 2 — Code Reading [trace]

> 로그인 화면에서 "회원가입" 링크를 탭하면 어떤 네비게이션 메서드가 실행되고,
> 그것이 `push`와 어떻게 다른가?

> [!answer]- 정답 보기
> - `app/auth/login.tsx` 안의 Pressable → `router.replace("/auth/signup")` 실행
> - **push**: 현재 화면을 스택에 유지하고 새 화면 추가 → 뒤로가기 시 login으로 돌아옴
> - **replace**: 현재 화면(login)을 스택에서 제거하고 signup으로 교체 → 뒤로가기 불가
> - replace를 쓰는 이유: 로그인 ↔ 회원가입 전환 시 스택이 쌓이지 않도록 함

---

## Exercise 3 — Configuration [config]

> NativeWind 클래스가 화면에 적용되지 않는다. 확인해야 할 설정 파일과
> 각각에서 무엇을 확인해야 하는가?

> [!answer]- 정답 보기
> 1. `babel.config.js`:
>    - `jsxImportSource: "nativewind"` 철자 확인 (`jsxImportSouce` 아님)
>    - `"nativewind/babel"` preset 포함 여부
> 2. `tailwind.config.js`:
>    - `content: []` 비어 있지 않은지 — `"./app/**/*.{js,jsx,ts,tsx}"` 포함해야 함
>    - `presets: [require("nativewind/preset")]` 포함 여부
> 3. `app/globals.css`:
>    - `@tailwind base;` `@tailwind components;` `@tailwind utilities;` 포함 여부
> 4. `app/_layout.tsx`:
>    - `import "./globals.css"` 최상단에 포함 여부

---

## Exercise 4 — Debugging [debug]

> iPhone 실기기에서 화면 상단 콘텐츠가 노치에 가려진다.
> 어디서 어떻게 수정하는가?

> [!answer]- 정답 보기
> **원인**: Safe Area insets 처리 누락
>
> **해결 방법 A (권장)**:
> ```typescript
> import { useSafeAreaInsets } from "react-native-safe-area-context";
> const insets = useSafeAreaInsets();
> <View style={{ paddingTop: insets.top }} className="flex-1 bg-primary">
> ```
>
> **해결 방법 B**:
> ```typescript
> import { SafeAreaView } from "react-native-safe-area-context";
> <SafeAreaView className="flex-1 bg-primary">
> ```
>
> **전제 조건**: `app/_layout.tsx`에 `<SafeAreaProvider>` 래핑 필요.
> 없으면 `useSafeAreaInsets()` 가 항상 0 반환.

---

## Exercise 5 — Debugging [debug]

> 로그인 화면에서 키보드가 올라오면 이메일 입력 필드가 가려진다.
> 원인과 수정 방법은?

> [!answer]- 정답 보기
> **원인**: `KeyboardAvoidingView`의 `behavior` prop이 잘못 설정되었거나 누락됨
>
> **수정**:
> ```typescript
> import { Platform } from "react-native";
>
> <KeyboardAvoidingView
>   behavior={Platform.OS === "ios" ? "padding" : "height"}
> >
> ```
> - iOS: `"padding"` — 키보드 높이만큼 하단 padding 추가
> - Android: `"height"` — 전체 높이를 줄임
>
> **추가 확인**: `ScrollView`에 `keyboardShouldPersistTaps="handled"` 포함 여부

---

## Exercise 6 — Extension [extend]

> 게시물 상세 화면(`/post/[id]`)에 댓글 입력 폼을 추가하려면
> 어떤 파일을 수정하고 무엇을 추가해야 하는가?

> [!answer]- 정답 보기
> 1. `app/post/[id].tsx` 수정:
>    - `useState<string>("")` — 댓글 입력 상태
>    - `KeyboardAvoidingView`로 전체 래핑 (키보드 가림 방지)
>    - ScrollView 하단에 입력 폼 추가:
>      ```typescript
>      <View className="flex-row px-4 py-2 border-t border-gray-800">
>        <TextInput
>          value={comment}
>          onChangeText={setComment}
>          placeholder="댓글 입력..."
>          className="flex-1 bg-gray-800 text-white rounded-xl px-3 py-2"
>        />
>        <Pressable onPress={handleSubmit} className="ml-2">
>          <Ionicons name="send" size={24} color="#AB8BFF" />
>        </Pressable>
>      </View>
>      ```
> 2. `types/index.ts`: `Comment` 타입 이미 정의됨 — 재사용
> 3. `constants/mockData.ts`: `MOCK_COMMENTS` 이미 존재 — import해서 사용

---

## Exercise 7 — Extension [extend]

> Profile 화면의 3열 이미지 그리드에서 특정 이미지를 탭하면
> 해당 게시물 상세로 이동하는 기능이 이미 구현되어 있다.
> 코드에서 어떻게 구현되었는지 `numColumns`와 `aspectRatio` 관련 코드를 찾아
> NativeWind className 대신 style prop을 쓴 이유를 설명하라.

> [!answer]- 정답 보기
> `app/(tabs)/profile.tsx`:
> ```typescript
> <FlatList
>   numColumns={3}
>   renderItem={({ item }) => (
>     <Pressable
>       onPress={() => router.push(`/post/${item.id}`)}
>       style={{ flex: 1, aspectRatio: 1, margin: 1 }}  // ← style prop
>     >
>       <Image style={{ width: "100%", height: "100%" }} />
>     </Pressable>
>   )}
> />
> ```
>
> **style prop 사용 이유**: NativeWind의 `aspect-square` 클래스가 `numColumns` FlatList 아이템과 함께 사용 시
> 레이아웃 계산이 불안정할 수 있음. `style={{ flex: 1, aspectRatio: 1 }}`은 RN 레이아웃 엔진이
> numColumns 분할 후 1:1 비율을 정확히 계산하도록 보장.

---

## Exercise 8 — Extension [extend]

> `PostCard` 컴포넌트에 북마크(저장) 버튼을 추가하려 한다.
> 좋아요 버튼 패턴을 참고해서 필요한 변경 사항을 설명하라.
> (타입, 컴포넌트 props, 화면 상태 관리 포함)

> [!answer]- 정답 보기
> 1. `types/index.ts`:
>    ```typescript
>    interface Post {
>      // 기존 필드...
>      savedByMe: boolean;  // 추가
>    }
>    ```
> 2. `components/PostCard.tsx`:
>    ```typescript
>    interface PostCardProps {
>      post: Post;
>      onLike: (postId: string) => void;
>      onSave: (postId: string) => void;  // 추가
>    }
>    // 렌더에 추가:
>    <Pressable onPress={() => onSave(post.id)}>
>      <Ionicons
>        name={post.savedByMe ? "bookmark" : "bookmark-outline"}
>        size={24}
>        color="#fff"
>      />
>    </Pressable>
>    ```
> 3. `app/(tabs)/index.tsx` (FeedScreen):
>    ```typescript
>    const handleSave = (postId: string) => {
>      setPosts(prev =>
>        prev.map(p => p.id === postId ? { ...p, savedByMe: !p.savedByMe } : p)
>      );
>    };
>    <PostCard post={item} onLike={handleLike} onSave={handleSave} />
>    ```
> 4. `constants/mockData.ts`: `savedByMe: false` 초기값 추가

---

> [!summary]- Phase 1 핵심 학습 포인트 요약
> | 패턴 | 핵심 포인트 |
> |------|------------|
> | Expo Router | 파일 = 라우트. `[id].tsx` → 동적 파라미터 자동 |
> | Safe Area | `useSafeAreaInsets` + `SafeAreaProvider` 필수 |
> | FlatList | 긴 리스트는 항상 FlatList (가상화). keyExtractor → string |
> | KeyboardAvoidingView | `Platform.OS === "ios" ? "padding" : "height"` |
> | TextInput | `onChangeText` (onChange 아님), `secureTextEntry` boolean prop |
> | Pressable | TouchableOpacity 대신 최신 API |
> | NativeWind | `content` 경로 + `jsxImportSource` 올바른 철자 필수 |
