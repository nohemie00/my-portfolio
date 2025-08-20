# 포트폴리오 웹사이트

## 📋 프로젝트 개요
개인 포트폴리오 웹사이트로, 네트워크 연결 시각화와 파트너사 로고 롤링 기능을 포함합니다.

## 🚀 주요 기능
- **메인 포트폴리오**: 개인 소개 및 프로젝트 갤러리
- **네트워크 시각화**: 5개 섹션으로 분리된 파트너사 네트워크 그래프
- **로고 롤링**: 연속 스크롤되는 파트너사 로고 애니메이션

## 📁 파일 구조
```
my-portfolio/
├── index.html              # 메인 포트폴리오 페이지
├── network.html            # 네트워크 연결 시각화
├── networkrolling.html     # 로고 롤링 페이지
├── style.css              # 메인 스타일시트
├── script.js              # 메인 자바스크립트
├── assets/                # 이미지 및 미디어 파일들
│   └── images/
│       ├── main/          # 메인 이미지들
│       ├── projects/      # 프로젝트 이미지들
│       └── icons/         # 아이콘들
└── README.md              # 프로젝트 설명서
```

## 🛠 기술 스택
- HTML5
- CSS3 (애니메이션, 그라데이션)
- JavaScript (Vanilla JS)
- vis.js (네트워크 시각화)

## 🌐 배포
GitHub Pages를 통해 정적 웹사이트로 배포 가능합니다.

## 📝 사용법
1. 모든 파일을 웹 서버에 업로드
2. `index.html`을 메인 페이지로 설정
3. `network.html`에서 네트워크 시각화 확인
4. `networkrolling.html`에서 로고 롤링 확인

## 🔧 로컬 실행
```bash
python3 -m http.server 8000
```
그 후 브라우저에서 `http://localhost:8000` 접속
