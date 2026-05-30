# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**커밋이즈커밍** (Commit is Coming) 공식 홈페이지는 정적 HTML/CSS/JavaScript 싱글 페이지 애플리케이션(SPA)입니다. 빌드 시스템이나 번들러 없이 순수 바닐라 코드로 구성되어 있습니다.

## 개발 환경 설정

### 로컬 서버 실행

정적 파일이므로 HTTP 서버가 필요합니다:

```bash
# Python 3 사용 (권장)
python3 -m http.server 8000

# 또는 Node.js http-server
npx http-server -p 8000
```

브라우저에서 `http://localhost:8000` 방문

## 프로젝트 아키텍처

### 파일 구조
```
comiscom/
├── index.html          # 전체 마크업 (싱글 페이지)
├── css/
│   └── style.css       # 모든 스타일 + 반응형 미디어 쿼리
├── js/
│   └── main.js         # 인터랙션 로직 (스크롤, 메뉴, 애니메이션)
└── README.md
```

### 핵심 설계 원칙

#### 1. 해시 기반 라우팅
- URL 해시로 섹션 식별: `/#hero`, `/#about`, `/#values`, `/#culture`, `/#profile`, `/#contact`
- `index.html`에서 모든 섹션이 `<section id="...">` 형태로 정의됨
- `js/main.js`의 `onScroll()` 함수가 현재 섹션을 감지하여 네비게이션 링크 활성화

#### 2. CSS 변수 기반 테마
- `css/style.css` 최상단의 `:root` 스코프에 모든 색상/크기 정의
- **주요 변수들**:
  - 배경색: `--color-bg` (다크 테마 전용: #0d1117)
  - 주요색: `--color-primary` (#58a6ff 블루), `--color-accent` (#3fb950 그린)
  - 글꼴: `--font-sans` (Noto Sans KR), `--font-mono` (IBM Plex Mono)
  - 반응형 패딩: `--section-pad` (100px 0)
- 색상 변경 시 변수만 수정하면 전체 적용

#### 3. 반응형 디자인
- 4가지 breakpoint 적용:
  - **Desktop**: 1200px 이상
  - **Tablet**: 768px ~ 1199px
  - **Mobile**: 480px ~ 767px
  - **Small Mobile**: 479px 이하
- 각 breakpoint에서 레이아웃, 글꼴 크기, 간격 조정

#### 4. JavaScript 구조 (바닐라)
- `DOMContentLoaded` 이벤트 기반 초기화
- **주요 모듈**:
  - **스크롤 감지** (`onScroll()`): 헤더 blur/활성 링크 업데이트
  - **모바일 메뉴** (`hamburger` 버튼): 열기/닫기 토글
  - **타이핑 애니메이션** (Hero): 3개 커맨드 순환
  - **Intersection Observer**: fade-in 애니메이션 트리거
  - **폼 처리** (Contact): 입력 검증 후 성공 메시지

### 외부 의존성 (CDN)
- **Google Fonts**: Noto Sans KR, IBM Plex Mono
- **Font Awesome 6**: 아이콘 (이메일, GitHub, 위치 등)

> 모두 CDN으로 제공되므로 `package.json` 없음

## 주의할 점

### HTML 수정 시
1. 모든 섹션은 고유한 `id` 속성을 가져야 함 (라우팅과 스크롤 감지 연결)
2. 네비게이션 링크의 `href`는 섹션 ID와 매칭되어야 함
3. 폼 입력 필드는 `data-*` 또는 `name` 속성으로 JS에서 접근 가능해야 함

### CSS 수정 시
1. 반응형 미디어 쿼리 주의:
   - `@media (max-width: 1199px)` — Tablet 이상
   - `@media (max-width: 767px)` — Mobile 이상
   - `@media (max-width: 479px)` — Small Mobile
2. 새 색상 추가 시 `:root` 변수로 정의 후 사용
3. 애니메이션은 `--transition`, `--transition-slow` 변수로 일관성 유지

### JavaScript 수정 시
1. 이벤트 리스너에 `{ passive: true }` 옵션 사용 (스크롤 성능)
2. DOM 조작 시 새 selector 추가하면 HTML과 동기화 필요
3. 애니메이션 타이밍 수정 시 CSS의 `animation-duration`과 JS 딜레이 값 비교

## 배포 및 호스팅

- GitHub Pages, Netlify, Vercel 등 정적 호스팅 서비스 지원
- 모든 파일이 공개되므로 API 키나 민감 정보 포함 금지
- 이메일 폼은 현재 Formspree/EmailJS 연동 미구현 (TODO 참고)

## 개선 예정 항목 (README.md 참고)

- 연락처 정보 실제 데이터로 업데이트
- 이메일 폼 전송 기능 연동
- 포트폴리오/프로젝트 갤러리 섹션
- Open Graph 메타 태그 추가
