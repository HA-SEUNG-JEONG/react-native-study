---
module: dashboard
path: 00-Dashboard
keywords: quick-reference, commands, setup, rn-movie
---

# Quick Reference

#dashboard #quick-reference

---

## Key Commands

| 액션 | 명령어 |
|------|--------|
| 의존성 설치 | `npm install` |
| 개발 서버 시작 | `npx expo start` |
| iOS 시뮬레이터 | `npx expo start --ios` |
| Android 에뮬레이터 | `npx expo start --android` |
| 캐시 초기화 후 시작 | `npx expo start --clear` |
| 테스트 실행 | `npm test` |
| 린트 | `npm run lint` |

---

## 웹 React vs React Native 핵심 차이

| 웹 React | React Native | 비고 |
|----------|-------------|------|
| `<div>` | `<View>` | 레이아웃 컨테이너 |
| `<p>`, `<span>` | `<Text>` | 텍스트는 반드시 Text 안에 |
| `<input>` | `<TextInput>` | `onChangeText` 사용 |
| `<button>` | `<Pressable>` | `TouchableOpacity` 구버전 |
| `<img>` | `<Image>` | `source={{ uri }}` 또는 `require()` |
| `<ul>` + map | `<FlatList>` | 긴 리스트는 FlatList 필수 |
| CSS | StyleSheet / NativeWind | 클래스명은 동일 |
| `onClick` | `onPress` | — |
| `onChange` | `onChangeText` | text string 직접 전달 |
| `window.history` | `router.push/back` | expo-router |

---

## Important File Locations

| 파일 / 폴더 | 역할 |
|------------|------|
| `app/_layout.tsx` | 루트 레이아웃 — SafeAreaProvider + Stack 등록 |
| `app/(tabs)/_layout.tsx` | 탭 바 설정 |
| `app/(tabs)/index.tsx` | Feed 화면 (홈) |
| `app/post/[id].tsx` | 게시물 상세 (동적 라우트) |
| `app/auth/login.tsx` | 로그인 폼 |
| `components/PostCard.tsx` | 피드 아이템 컴포넌트 |
| `types/index.ts` | User, Post, Comment 타입 |
| `constants/mockData.ts` | 목 게시물 데이터 |
| `services/useFetch.ts` | 범용 데이터 패칭 훅 |
| `babel.config.js` | NativeWind jsxImportSource 설정 |
| `tailwind.config.js` | 커스텀 색상 토큰 + content 경로 |

---

## Common Debugging

| 증상 | 확인할 곳 | 노트 |
|------|-----------|------|
| NativeWind 클래스가 적용 안 됨 | `babel.config.js` jsxImportSource 확인 | [[Config Module]] |
| 노치에 콘텐츠 가려짐 | `useSafeAreaInsets` 또는 `SafeAreaView` 누락 | [[Screens Module]] |
| 키보드가 입력 필드 가림 | `KeyboardAvoidingView` + `behavior` 값 확인 | [[Screens Module]] |
| 화면 전환이 안 됨 | `app/_layout.tsx` Stack.Screen 등록 확인 | [[Navigation Flow]] |
| 동적 라우트 id 못 읽음 | `useLocalSearchParams<{ id: string }>()` 확인 | [[Navigation Flow]] |
| FlatList 빈 화면 | `keyExtractor` 반환값이 string인지 확인 | [[Screens Module]] |

---

## NativeWind 주의사항

```
❌ p-[4px]        → 임의값 금지
✅ p-4            → 기본 토큰 (16px)

❌ bg-[#030014]   → 하드코딩 금지
✅ bg-primary     → tailwind.config.js 커스텀 토큰

❌ w-[320px]      → 고정 너비 금지
✅ w-full max-w-sm → 반응형 방식
```
