# Screens — 개념 트래커

| 개념 | 시도 | 맞음 | 마지막 테스트 | 상태 |
|------|------|------|--------------|------|
| FlatList keyExtractor 타입 | 1 | 0 | 2026-04-22 | 🔴 |

### 오답 메모

**FlatList keyExtractor 타입**
- 혼동: number 반환 가능하다고 오해
- 핵심: 반드시 string 반환. id가 number이면 `.toString()` 변환 필수. React 내부에서 key를 string으로 처리함.
