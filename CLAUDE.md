# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start              # Start Expo dev server (scan QR with Expo Go)
npm run ios            # Open in iOS simulator
npm run android        # Open in Android emulator
npm test               # Run Jest tests (watch mode)
npm run lint           # Run expo lint
```

## Architecture

**Expo Router v4** — file system = route tree. Every file under `app/` is a route.

```
app/
  _layout.tsx          # Root: SafeAreaProvider + Stack registration
  globals.css          # @tailwind directives — imported in _layout.tsx
  (tabs)/
    _layout.tsx        # Tab bar: Feed, Search, Profile (saved hidden via href: null)
    index.tsx          # Feed screen
    search.tsx         # Search screen
    profile.tsx        # Profile screen
  post/[id].tsx        # Post detail (Stack, headerShown: false)
  auth/login.tsx       # Login modal
  auth/signup.tsx      # Signup modal
components/
  PostCard.tsx         # Feed item — like state owned by parent (FeedScreen)
types/index.ts         # User, Post, Comment interfaces
constants/mockData.ts  # MOCK_POSTS, MOCK_ME, MOCK_COMMENTS (picsum.photos/seed/*)
services/
  useFetch.ts          # Generic data-fetching hook (Phase 1 legacy)
  api.ts               # TMDB API calls (legacy)
  appwrite.ts          # Appwrite search tracking (legacy)
```

## Styling

NativeWind v4 (Tailwind CSS for React Native). Use `className` prop on all RN components.

**Custom tokens** (defined in `tailwind.config.js`):
- `bg-primary` / `text-primary` → `#030014` (dark background)
- `bg-accent` / `text-accent` → `#AB8BFF` (purple)
- `light.100`–`light.900`, `dark.100`–`dark.900` (purple scale)

**Known issue**: `tailwind.config.js` has `content: []` empty — styles work in dev but will be purged in production builds. Add paths before building for release:
```js
content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"]
```

**NativeWind RN limitations**: no `grid-*`, no `hover:`/`focus:`, `gap-*` only works in flex containers.

Use `style` prop (not className) for `aspectRatio` on `FlatList` items with `numColumns` — NativeWind's `aspect-square` is unreliable in that context.

## Key Patterns

**Safe area**: Use `useSafeAreaInsets()` for `paddingTop`. `SafeAreaProvider` is at root `_layout.tsx` — required or hook always returns 0.

**Navigation**:
- `router.push("/post/1")` — add to stack (back button returns)
- `router.replace("/auth/signup")` — swap screens (no back)
- Dynamic params: `useLocalSearchParams<{ id: string }>()`

**Keyboard forms**: `KeyboardAvoidingView` with `behavior={Platform.OS === "ios" ? "padding" : "height"}`. Add `keyboardShouldPersistTaps="handled"` on `ScrollView`.

**Lists**: `FlatList` for scrollable content (virtualized). `keyExtractor` must return a string.

**Touch**: Use `Pressable` (not `TouchableOpacity`).

**Imports**: Use `@/` alias (maps to project root). Example: `import PostCard from "@/components/PostCard"`.

## Phase Status

- **Phase 1 (complete)**: Navigation, NativeWind styling, Safe Area, FlatList feed, auth forms
- **Phase 2 (next)**: `@tanstack/react-query` (useInfiniteQuery + optimistic mutations), `zustand` auth store, JWT + `expo-secure-store`
- **Phase 3 (planned)**: `expo-image-picker`, `expo-notifications`, `expo-haptics`
