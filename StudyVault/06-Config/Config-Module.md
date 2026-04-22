---
module: config
path: babel.config.js, tailwind.config.js, tsconfig.json, app.json
keywords: nativewind, babel, tailwind, typescript, expo-config
---

# Config Module ★★

#config-nativewind #config-babel

---

## Purpose

빌드 도구 + 스타일 시스템 설정. NativeWind 동작에 필수적인 설정이 여기 집중됨.

---

## Key Files

| 파일 | 역할 |
|------|------|
| `babel.config.js` | NativeWind JSX transform 설정 |
| `tailwind.config.js` | 커스텀 색상 토큰 + content 경로 |
| `tsconfig.json` | `@/` path alias 설정 |
| `app.json` | Expo 앱 메타데이터 (이름, 아이콘, slug) |
| `metro.config.js` | Metro 번들러 + NativeWind CSS 처리 |

---

## babel.config.js — NativeWind 설정

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // jsxImportSource: RN 컴포넌트에 className prop 활성화
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel"
    ]
  };
};
```

> [!warning]
> **흔한 버그**: `jsxImportSouce` (오타) 또는 `"nativewindd"` (오타) 로 작성 시
> NativeWind 클래스가 전혀 적용되지 않음. 이 프로젝트 초기 세팅에 실제 존재하던 버그.

---

## tailwind.config.js — 커스텀 토큰

```javascript
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",        // 스크린
    "./components/**/*.{js,jsx,ts,tsx}", // 컴포넌트
  ],
  presets: [require("nativewind/preset")], // RN 기본 스타일 포함
  theme: {
    extend: {
      colors: {
        primary: "#030014",   // bg-primary
        accent: "#AB8BFF",    // bg-accent, text-accent
        // light.100 ~ light.900
        // dark.100 ~ dark.900
      }
    }
  }
};
```

> [!important]
> `content: []` 가 비어 있으면 Tailwind가 사용 클래스를 감지 못해
> 프로덕션 빌드에서 모든 스타일이 제거됨.
> 개발 중에는 동작해도 빌드 시 깨질 수 있음.

---

## tsconfig.json — Path Alias

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]   // @/components → ./components
    }
  }
}
```

프로젝트 어디서나 `@/` 로 루트 기준 import:
```typescript
import PostCard from "@/components/PostCard";   // ✅
import PostCard from "../../components/PostCard"; // ❌ 상대경로 지양
```

---

## NativeWind v4 주의사항

| 제약 | 이유 |
|------|------|
| `gap-*` 는 flexbox에서만 동작 | RN flexbox 제한 |
| `grid-*` 사용 불가 | RN에 CSS Grid 없음 → `numColumns` 사용 |
| `hover:`, `focus:` 대부분 미지원 | 마우스/포커스 이벤트 없음 |
| `aspect-square` 동작함 | NativeWind v4에서 지원 |
| `w-full aspect-square` Image 패턴 | 정사각형 이미지 표준 방법 |

---

## Related Notes
- [[System Architecture]]
- [[Screens Module]]
