# 🛒 Noir — 음반 장바구니 + 확인 모달

LP 음반 장바구니에 전체 삭제 확인 모달을 추가한 서비스입니다.  
Redux Toolkit으로 장바구니 상태와 모달 UI 상태를 모두 전역 관리합니다.

---

## 주요 기능

### 장바구니
- 음반 목록 카드 렌더링 (썸네일, 제목, 아티스트, 가격)
- 수량 증가 / 감소 버튼
  - 수량이 1일 때 `-` 버튼을 누르면 해당 아이템 자동 삭제
  - `✕` 버튼으로도 개별 삭제 가능
- 전체 삭제 버튼 → 확인 모달 열기
- 장바구니가 비어있을 때 빈 상태 화면 표시

### 확인 모달
- "정말 삭제하시겠습니까?" 모달 팝업
- **아니요** — 모달만 닫힘
- **네** — 전체 삭제 후 모달 닫힘
- `useState` 없이 Redux `modalSlice`로만 상태 제어

### 합계 계산
- 총 수량 및 총 금액 실시간 자동 계산

### 네비게이션 바
- 브랜드명 "Noir" 표시
- 현재 장바구니 총 수량 실시간 반영

---

## ✨ 이번 주에 작업한 내용

### Mission 02 — modalSlice + Reducer 중심 상태 관리

단순 장바구니를 넘어, 모달 UI 상태까지 Redux로 관리하는 구조를 설계했다.

- **파일 구조 개편** — `features/` 폴더 도입으로 Slice 단위 분리
  - `src/features/cart/cartSlice.ts`
  - `src/features/modal/modalSlice.ts`
- **modalSlice 구현**
  - `isOpen` 상태 관리
  - `openModal()` / `closeModal()` 리듀서
- **컴포넌트 흐름**
  - 전체 삭제 버튼 → `openModal()` dispatch
  - 모달 "아니요" → `closeModal()` dispatch
  - 모달 "네" → `clearCart()` + `calculateTotals()` + `closeModal()` dispatch
- `useState` 미사용 — 모든 UI 상태를 Reducer로만 제어

---

## 기술 스택

| 분류 | 사용 기술 |
|------|-----------|
| 프레임워크 | React 19 + TypeScript |
| 번들러 | Vite |
| 스타일 | Tailwind CSS v4 |
| 전역 상태 | Redux Toolkit + React-Redux |

---

## 폴더 구조

```
src/
├── components/         # Navbar, CartList, CartItem, CartTotals, Modal
├── constants/          # cartItems.ts (Mock 데이터 + CartItem 타입)
├── features/
│   ├── cart/           # cartSlice.ts
│   └── modal/          # modalSlice.ts
├── hooks/              # useAppDispatch, useAppSelector
└── store/              # store.ts (cart + modal reducer 등록)
```

---

## 시작하기

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev
```
