---
module: components
path: components/
keywords: PostCard, Pressable, Image, reusable-components, react-native
---

# Components Module ★★

#module-components #arch-component #pattern-pressable

---

## Purpose

`components/` 폴더: 여러 화면에서 재사용되는 UI 조각. 화면(Screen)은 레이아웃과 데이터를 담당하고, 컴포넌트는 표현(렌더링)만 담당.

---

## Key Files

| 파일 | 역할 |
|------|------|
| `components/PostCard.tsx` | 피드 아이템 — 이미지 + 좋아요 + 캡션 |
| `components/MovieCard.tsx` | 영화 카드 (Phase 1 이전 레거시) |
| `components/SearchBar.tsx` | 검색 입력 컴포넌트 (레거시) |

---

## PostCard 해설

```typescript
interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;  // 상태는 부모(FeedScreen)가 소유
}
```

> [!important]
> 좋아요 상태를 PostCard 내부에 두지 않고 **부모에서 관리**.
> Phase 2에서 낙관적 업데이트를 React Query로 교체할 때 변경 범위를 최소화하기 위함.

---

## Pressable vs TouchableOpacity

```typescript
// ✅ 권장 (RN 최신 API)
<Pressable onPress={handlePress}>
  <Text>탭</Text>
</Pressable>

// ❌ 구버전 (여전히 동작하지만 새 코드에서는 Pressable 사용)
<TouchableOpacity onPress={handlePress}>
  <Text>탭</Text>
</TouchableOpacity>
```

| | Pressable | TouchableOpacity |
|---|---|---|
| API | 최신 | 구버전 |
| 스타일 변경 | `style={({ pressed }) => ...}` | `activeOpacity` prop |
| 권장 | ✅ | 레거시 코드에서만 |

---

## Image 컴포넌트

```typescript
// 원격 이미지 (URI)
<Image
  source={{ uri: "https://picsum.photos/600/600" }}
  className="w-full aspect-square"
  resizeMode="cover"
/>

// 로컬 이미지 (require)
<Image source={require("@/assets/images/logo.png")} />
```

> [!warning]
> 웹 `<img src="...">` 와 다르게 `source={{ uri: "..." }}` 형태로 감쌈.
> 로컬 파일은 `require()` 사용 — string 경로 직접 불가.

---

## Internal Flow (PostCard)

```text
PostCard({ post, onLike })
  ↓
유저 헤더 (Image + Text)
  ↓
이미지 (Pressable → router.push post detail)
  ↓
액션 바 (좋아요 Pressable → onLike(post.id))
  ↓
캡션 (Text)
```

---

## Dependencies

| 방향 | 모듈 | 경로 |
|------|------|------|
| **Uses** | types (Post) | `@/types` |
| **Uses** | expo-router (useRouter) | `expo-router` |
| **Uses** | @expo/vector-icons (Ionicons) | `@expo/vector-icons` |
| **Used by** | FeedScreen | `app/(tabs)/index.tsx` |

---

## Related Notes
- [[Screens Module]]
- [[Types Constants Module]]
