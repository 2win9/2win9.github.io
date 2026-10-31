# 2win9

Astro로 만든 2win9 개발 블로그입니다. 저장소는 **2win9.github.io**, 블로그 주소는 **https://2win9.github.io/** 입니다.

기본은 라이트 모드입니다.

## 글을 올리고 수정하는 방법

처음 한 번 GitHub와 Pages CMS를 연결하면, 평소에는 **웹 편집기에서 작성 → 공개 확인 → 저장**만 하면 됩니다. Git 명령어나 개발 서버 실행은 필요 없습니다. 저장 후 GitHub Actions의 빌드가 성공하면 GitHub Pages에 반영됩니다.

### 처음 한 번: GitHub Pages 배포

1. `2win9` GitHub 계정에 `2win9.github.io` 저장소를 만들고 이 프로젝트 소스를 `main` 브랜치에 올립니다. `node_modules`, `dist`, `.astro`, `.sites-runtime` 폴더는 올리지 않습니다.
2. 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
3. **Actions → Publish 2win9 → Run workflow**를 실행합니다. 이후에는 글이나 설정이 저장될 때 자동 배포됩니다.
4. 블로그 주소는 `https://2win9.github.io/`입니다. GitHub Actions 빌드에서 사용자 사이트 저장소 이름을 확인해 기본 경로를 `/`로 설정합니다.

공개 저장소의 글 파일은 ‘공개’를 꺼도 저장소에서 읽을 수 있습니다. 비공개 초안이 필요하면 저장소와 GitHub Pages의 계정별 제공 조건을 확인한 뒤 비공개 저장소를 선택하세요. ‘공개’는 사이트 노출 여부를 정하는 설정입니다.

### 처음 한 번: 웹 편집기 연결

1. [Pages CMS](https://app.pagescms.org/)에서 GitHub로 로그인합니다.
2. Pages CMS GitHub App에 **2win9.github.io 저장소만** 연결합니다.
3. 해당 저장소와 `main` 브랜치를 선택합니다. 프로젝트 루트의 `.pages.yml`이 글 편집 화면을 구성합니다.
4. ‘블로그 설정’에서 GitHub 프로필과 저장소 주소를 넣고 저장합니다. 소개글, 홈 제목, 주제색도 여기서 바꿀 수 있습니다.

Pages CMS는 별도 서비스입니다. 현재 프로젝트에는 편집 설정이 준비되어 있으며 사용자의 GitHub 로그인, 앱 설치, 저장소 연결은 별도로 완료해야 합니다. ChatGPT에서 제공되는 확인용 배포는 GitHub Pages 자동 배포 대상이 아닙니다.

### 새 글

1. Pages CMS의 ‘글’에서 새 항목을 만듭니다.
2. 제목, 작성일, 분류, 본문을 입력합니다. 한 줄 설명, 태그, 수정일은 선택입니다.
3. 본문은 서식 편집기에서 입력하거나 Source로 전환해 Markdown을 쓸 수 있습니다. 이미지를 업로드하면 `public/images/`에 저장됩니다.
4. ‘공개’를 켜고 저장합니다. 잠시 후 블로그에 반영됩니다.

### 기존 글 수정

‘글’에서 해당 글을 열어 수정한 뒤 저장합니다. 제목을 바꾸어도 파일 이름을 유지하기 때문에 기존 글 주소가 유지됩니다. 필요하면 수정일을 입력합니다.

### 임시저장

‘공개’를 끄고 저장하면 원본 파일은 보관하면서 사이트의 목록, 상세 페이지, RSS에서 빠집니다. GitHub 저장소 자체의 접근 권한과는 별개입니다. 예시 글 세 개는 수정하거나 삭제해도 됩니다. 자신의 글로 바꾼 경우 ‘예시 글 표시’를 꺼 주세요.

## 댓글과 방문통계

Pages CMS의 **댓글 및 방문통계**에서 연결 정보를 수정할 수 있습니다. 설정은 `src/config/integrations.json`에 저장됩니다.

- **giscus 댓글:** 저장소의 Discussions를 켜고 [giscus 앱](https://github.com/apps/giscus)을 이 저장소에 연결합니다. [giscus 설정](https://giscus.app/ko)에서 발급된 저장소 ID와 카테고리 ID를 입력하고 ‘댓글 사용’을 켭니다. 글 주소의 경로를 기준으로 댓글을 연결하며, 공개된 글 하단에 한국어 댓글 창이 표시됩니다.
- **Cloudflare Web Analytics:** Cloudflare의 Web Analytics에 `2win9.github.io`를 등록하고, 제공된 스크립트의 `token` 값을 입력한 뒤 ‘방문통계 사용’을 켭니다. 이 값은 공개 스크립트용 사이트 식별자이며, Cloudflare API 토큰을 입력하는 곳이 아닙니다. 통계 코드는 배포용 빌드에서만 로드되므로 로컬 개발 방문은 집계하지 않습니다.

연결 정보가 비어 있거나 사용 설정이 꺼져 있으면 해당 외부 스크립트를 로드하지 않습니다. 댓글은 GitHub Discussions에서, 방문통계는 Cloudflare 대시보드에서 관리합니다.

## 로컬 개발

Node.js 24 LTS 환경을 권장합니다. 설치 버전은 `package-lock.json`으로 고정합니다.

```bash
npm ci
npm run dev
```

```bash
npm run check
npm run build
npm run preview
```

## 구조

| 위치 | 내용 |
| --- | --- |
| `src/content/posts/` | Markdown 글 |
| `src/config/site.json` | 이름, 소개, 주제색 |
| `.pages.yml` | 웹 편집기 설정 |
| `src/content.config.ts` | 글 데이터 검증 |
| `src/styles/global.css` | 스타일 |
| `.github/workflows/deploy.yml` | GitHub Pages 자동 배포 |

이미지의 `/images/` 경로는 빌드할 때 GitHub Pages의 저장소 경로를 자동으로 붙입니다. 따라서 CMS에서 올린 이미지를 글마다 수정할 필요가 없습니다.

## 개인 도메인

GitHub Pages의 도메인 및 DNS 연결을 먼저 완료하고 ‘블로그 설정’의 개인 도메인 주소를 `https://example.com` 형태로 입력합니다. 이 프로젝트는 사용자 지정 GitHub Actions 워크플로로 배포하므로 `CNAME` 파일은 필요하지 않습니다. 개인 도메인을 설정하면 기본 저장소 경로를 사용하지 않습니다.

## 색상

`#333F48` · `#536B7A` · `#316763` · `#FAFAF9` · `#24292F`


## 참고

- [Astro](https://docs.astro.build/)
- [Pages CMS 시작하기](https://pagescms.org/docs/quick-start/)
- Thanks to [DukY8n](https://duky8n.com/) for the inspiration.
