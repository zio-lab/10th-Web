# 🛒 Noir — 음반 장바구니

LP 음반을 담고, 수량을 조절하고, 금액을 확인하는 장바구니 서비스입니다.  
Redux Toolkit을 사용하여 전역 상태를 관리합니다.

---

## 주요 기능

### 장바구니
- 음반 목록 카드 렌더링 (썸네일, 제목, 아티스트, 가격)
- 수량 증가 / 감소 버튼
  - 수량이 1일 때 `-` 버튼을 누르면 해당 아이템 자동 삭제
  - `✕` 버튼으로도 개별 삭제 가능
- 전체 삭제 버튼
- 장바구니가 비어있을 때 빈 상태 화면 표시

### 합계 계산
- 총 수량 및 총 금액 실시간 자동 계산
- 아이템 추가·삭제·수량 변경 시마다 `calculateTotals` 액션으로 재계산

### 네비게이션 바
- 브랜드명 "Noir" 표시
- 현재 장바구니 총 수량 실시간 반영

---

## ✨ 이번 주에 작업한 내용

### Mission 01 — Redux Toolkit 장바구니

Redux Toolkit으로 장바구니 전역 상태를 설계하고 구현했다.

- `cartSlice`에 `cartItems`, `amount`, `total` 상태 정의
- 초기값을 Mock 데이터(`cartItems.ts`)에서 자동 계산하여 설정
- 리듀서 5가지 구현
  - `increase` — 특정 아이템 수량 +1
  - `decrease` — 수량 -1, 수량이 1이면 아이템 자동 삭제
  - `removeItem` — 개별 아이템 삭제
  - `clearCart` — 전체 삭제
  - `calculateTotals` — 총 수량·총 금액 재계산
- `useAppDispatch` / `useAppSelector` 타입 훅 직접 구현
- `useEffect`로 `cartItems` 변경 시마다 `calculateTotals` 자동 호출

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
├── components/     # Navbar, CartList, CartItem, CartTotals
├── constants/      # cartItems.ts (Mock 데이터 + CartItem 타입)
├── hooks/          # useAppDispatch, useAppSelector
└── store/          # store.ts, cartSlice.ts
```

---

## 시작하기

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev
```
