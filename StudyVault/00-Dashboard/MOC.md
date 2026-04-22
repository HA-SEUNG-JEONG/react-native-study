---
module: dashboard
path: 00-Dashboard
keywords: MOC, onboarding, architecture, rn-movie, expo, react-native
---

# rn-movie — Onboarding Map

#dashboard #onboarding

> **학습 목표**: 웹 React 개발자가 Expo + React Native 실무 패턴을 체득하는 SNS 피드 앱.
> 3개 Phase로 구성: Phase 1 (Nav+Style) → Phase 2 (State+API) → Phase 3 (Native).

---

## Architecture Overview

- **Pattern**: 파일 기반 라우팅 (Expo Router) + 컴포넌트 계층
- **Tech Stack**: React Native 0.76 / Expo SDK 52 / TypeScript / NativeWind v4
- **라우팅**: `app/` 폴더 구조 = URL 구조 (웹과 동일 개념)
- → [[System Architecture]]
- → [[Navigation Flow]]

---

## Module Map

| 모듈 | 역할 | 핵심 진입점 | 노트 |
|------|------|------------|------|
| Screens | 화면 컴포넌트 (Expo Router 라우트) | `app/` | [[Screens Module]] |
| Components | 재사용 UI 조각 | `components/` | [[Components Module]] |
| Services | API 호출 + 커스텀 훅 | `services/` | [[Services Module]] |
| Types & Constants | 타입 정의 + 목 데이터 | `types/`, `constants/` | [[Types Constants Module]] |
| Config | 빌드 / 스타일 설정 | `babel.config.js`, `tailwind.config.js` | [[Config Module]] |

---

## 현재 구현 상태 (Phase 1 완료)

| 화면 | 경로 | 기능 |
|------|------|------|
| Feed | `/(tabs)/` | FlatList 피드, 좋아요 토글 |
| Search | `/(tabs)/search` | TextInput 실시간 필터 |
| Profile | `/(tabs)/profile` | 3열 그리드, 프로필 헤더 |
| Post Detail | `/post/[id]` | Stack 상세 화면 |
| Login | `/auth/login` | KeyboardAvoidingView 폼 |
| Signup | `/auth/signup` | KeyboardAvoidingView 폼 |

---

## Getting Started

1. **Prerequisites**: Node.js 20+, Expo CLI, Expo Go 앱 (실기기)
2. **Install**: `npm install`
3. **Run**: `npx expo start`
4. **실기기 테스트**: Expo Go에서 QR 스캔
5. **iOS 시뮬레이터**: `npx expo start --ios`

---

## Tag Index

| Tag | 설명 | 사용 규칙 |
|-----|------|----------|
| `#arch-expo-router` | Expo Router 라우팅 패턴 | 라우팅 관련 노트 |
| `#arch-component` | 컴포넌트 아키텍처 | UI 계층 노트 |
| `#module-screens` | 화면 컴포넌트 | `app/` 내 파일 |
| `#module-components` | 재사용 컴포넌트 | `components/` 내 파일 |
| `#module-services` | 서비스 레이어 | `services/` 내 파일 |
| `#pattern-safe-area` | SafeArea 처리 패턴 | 노치/홈바 관련 |
| `#pattern-flatlist` | FlatList 가상화 | 리스트 최적화 |
| `#pattern-keyboard` | KeyboardAvoidingView | 폼 화면 |
| `#config-nativewind` | NativeWind/Tailwind 설정 | 스타일 관련 |

---

## Onboarding Path (추천 읽기 순서)

1. [[System Architecture]] — 전체 구조 파악
2. [[Navigation Flow]] — 화면 전환 흐름
3. [[Screens Module]] — 개별 화면 이해
4. [[Components Module]] — 재사용 컴포넌트
5. [[Services Module]] — 데이터 레이어
6. [[Config Module]] — 빌드/스타일 설정
7. [[Phase 1 Navigation Exercises]] — 직접 실습
