# HowAreNews

<img src="https://i.imgur.com/3IZNTpe.png" width="100%" alt="coverImg"/>

How Are New? : 오늘의 뉴스가 궁금하시다면!

## 토이 프로젝트 진행 목적

- `React` `Typescript` 컴포넌트 모듈화
- `async`, `await`로 비동기 프로그래밍 코드 작성
- `CSS` 전처리기 `SASS` 사용
- `React-Query`로 상태 관리 및 비동기 프로그래밍
- `vite create` 및 `vercel` 배포
- `firebase`로 로그인 기능 구현
- mobile, tablet, pc 버전을 고려한 반응형 UI 디자인

<br>

## 최종 구현 화면

- vercel - [https://how-are-news.vercel.app/](https://how-are-news.vercel.app/)

### 로그인 / 회원가입

<img src="/src/assets/cover_login.png" width="100%" alt="coverImg"/>

### SNS 로그인

<img src="/src/assets/cover_google.png" width="100%" alt="coverImg"/>

### 카테고리 (홈, 라이프 스타일, 정치, 건강, 금융, 스포츠, IT 기술)

<img src="/src/assets/cover_main.png" width="100%" alt="coverImg"/>

<br>

## 구현 요구 사항 목록

- [✅] 컴포넌트 모듈화
- [✅] 로그인 기능 구현 (로그인, 로그아웃, 회원가입)
- [✅] 라우터로 메뉴 카테고리 구현 (홈, 비즈니스, 엔터테인먼트 등)
- [✅] 심플하고 가독성이 높은 UI
- [✅] 모바일, 타블렛, 피씨 버전을 고려한 반응형 웹 사이트
- [✅] CSS 라이브러리 없이 SASS로 UI 구현
- [✅] img fetch error 케이스 default img로 분기 처리
- [✅] fetch data string 한글 깨짐 현상 분기 처리

<br>

## 사용한 프레임워크 및 라이브러리 설명

- React: 컴포넌트 기반의 화면구성, Virtual DOM으로 인한 속도 향상, SPA(싱글 페이지 애플리케이션)
- TypeScript: 초기 데이터와 컴포넌트 사이에 전달되는 데이터의 컴파일 오류를 방지하기 위해 사용
- React-Query: 데이터 패칭시 로딩, 에러 state 관리를 쉽게 하기 위해 사용
- SASS/SCSS: 변수로 css 유지보수가 용이하기 위해 사용
- Vite: build 속도를 빠르게 하기 위해 사용
- Firebase: 사용자 데이터 저장 및 로그인 기능 구현을 위해 사용

## 실행 방법

```
yarn install
yarn dev
```
