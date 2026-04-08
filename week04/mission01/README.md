# 🎬 Movie App

TMDB API를 활용하여 영화 정보를 조회할 수 있는 웹 애플리케이션입니다.

---

## 📦 설치 방법

````bash
pnpm install

## 🚀 실행 방법

```bash
pnpm dev

---

## 🔐 환경 변수 (.env)

```env
VITE_TMDB_KEY=your_api_key
> ⚠️ 실제 API 키는 .env 파일에만 작성하고, GitHub에는 업로드하지 않습니다.

---

📄 주요 페이지
🏠 홈 페이지
🎞 영화 목록 페이지
→ 인기 / 평점 높은 / 개봉 예정 / 상영 중 영화 조회
→ 페이지네이션 기능 제공
🎬 영화 상세 페이지
→ 영화 상세 정보 조회
→ 출연진 및 감독 정보 확인

⚙ 주요 기능
TMDB API를 이용한 영화 데이터 요청
카테고리별 영화 리스트 조회
페이지네이션 기능 구현
로딩 상태 처리 (Loading Spinner)
에러 처리 UI 제공

🛠 사용 기술
React
TypeScript
Vite
Tailwind CSS
Axios
````
