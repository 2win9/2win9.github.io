---
title: 글을 쉽게 쓰기 위한 구조
description: Pages CMS의 저장 버튼에서 GitHub 커밋, Astro 빌드, GitHub Pages 배포까지 이어지는 구조를 살펴봤다.
pubDate: 2026-10-31
updatedDate: 2026-11-01
category: logs
tags:
  - Astro
  - CMS
published: true
example: false
---

첫 글에서 Pages CMS 덕분에 글을 작성하고 관리하는 과정이 편해졌다고 적었다.

브라우저에서 제목과 본문을 쓰고 저장하면 블로그에 반영된다. 편리하긴 한데, 어떻게 연결된 것인지 궁금해졌다.

**Pages CMS를 사용하면 원래 이렇게 되는 걸까? 내 블로그 형태에 맞춰 추가로 개발하거나 설정한 부분이 있는 걸까?**

이번 블로그는 AI의 도움으로 구축했다. 그래서 완성된 화면을 사용하는 것에서 한 걸음 더 들어가, 글을 저장했을 때 어떤 일이 일어나는지 정리해 보고 싶었다.

## Pages CMS가 맡는 일

Pages CMS는 GitHub 저장소에 있는 콘텐츠를 웹 화면에서 편집할 수 있게 해 주는 도구다. 글 편집 화면과 GitHub 로그인·저장 기능을 제공한다.

내가 웹에서 작성한 글은 저장소의 마크다운 파일로 남는다. 블로그 소개처럼 JSON 파일로 관리하는 내용도 편집할 수 있다.[^pages-cms]

여기에 내 블로그의 파일 위치와 입력 항목을 알려주는 설정이 필요하다.

## 내 블로그 구조를 알려주는 .pages.yml

저장소 최상위에는 `.pages.yml`이라는 설정 파일이 있다.

이 파일에 글이 저장될 폴더, 편집할 항목, 이미지 업로드 위치 등을 정의한다. Pages CMS는 이 설정을 읽어서 해당 저장소의 편집 화면을 구성한다.[^configuration]

아래는 내 블로그의 글 설정을 일부 간추린 것이다.

```yaml
content:
  - name: posts
    label: 글
    type: collection
    path: src/content/posts
    format: yaml-frontmatter
    fields:
      - name: title
        label: 제목
        type: string
      - name: body
        label: 본문
        type: rich-text
        options:
          format: markdown
```

`path`는 글 파일을 저장할 위치이고, `fields`는 편집 화면에 표시할 입력 항목이다. 실제 설정에는 작성일, 분류, 태그, 공개 여부 같은 항목도 들어 있다.

현재 블로그에서 관리하는 파일은 다음과 같다.

| 관리하는 내용 | 저장 위치 |
|---|---|
| 글 | `src/content/posts` |
| 업로드한 이미지 | `public/images` |
| 블로그 소개와 설정 | `src/config/site.json` |
| 소개 페이지의 타임라인 | `src/config/timeline.json` |
| 댓글·방문통계 연결 설정 | `src/config/integrations.json` |

블로그의 ‘글 관리’ 화면에는 Pages CMS로 이동하는 버튼과 작성 안내도 추가되어 있다.

이번에 구성한 연동 작업은 이런 파일 구조와 편집 항목을 연결하고, 블로그에서 편집기로 들어가는 경로를 마련하는 일이었다.

## 저장 버튼을 누르면 GitHub 파일이 바뀐다

Pages CMS에 GitHub 계정으로 로그인하고 저장소를 연결해 두면, 웹에서 수정한 내용을 그 저장소에 저장할 수 있다.

글을 작성하면 제목·작성일·분류 등의 정보와 본문이 마크다운 파일에 반영되고, 변경 내용은 GitHub 커밋으로 남는다.

예전에 내가 직접 하던 파일 수정과 커밋·푸시 작업을 웹 편집기가 처리해 주는 셈이다. 작성하는 화면은 편해졌고, 콘텐츠는 계속 내 저장소의 파일과 변경 이력으로 관리된다.[^pages-cms]

## 배포는 GitHub Actions가 이어받는다

글 파일이 저장된 뒤에는 블로그에 반영하는 과정이 이어진다.

내 저장소에는 `.github/workflows/deploy.yml`에 자동 배포 작업이 설정되어 있다.

1. Pages CMS에서 저장한 변경 사항이 `main` 브랜치에 반영된다.
2. GitHub Actions의 배포 작업이 실행된다.
3. 검사와 Astro 빌드를 진행해 블로그 페이지를 만든다.
4. 작업이 성공하면 GitHub Pages에 배포한다.

Astro 사이트를 GitHub Actions로 빌드하고 GitHub Pages에 배포하는 구조다.[^astro-pages]

‘웹에서 저장하면 블로그에 올라간다’는 동작 뒤에는 편집기, 저장소, 빌드 도구, 배포 환경이 연결되어 있었다.

## 편해진 과정의 안쪽을 이해하기

궁금했던 질문에 대한 답도 정리됐다.

Pages CMS가 제공하는 편집 기능을 활용하면서, 내 블로그의 파일 구조에 맞춘 설정과 자동 배포 흐름을 추가로 연결한 것이었다.

AI의 도움으로 편리한 환경을 만드는 것도 좋지만, 어떤 파일에 무엇이 저장되고 어떤 작업을 거쳐 화면에 반영되는지 알아두면 이후에 블로그를 손볼 때도 도움이 될 것 같다.

이제 글을 올리는 과정에서 덜 지치게 됐으니, 그만큼 기록을 남기는 데 시간을 써 보려고 한다.

[^pages-cms]: [Pages CMS — Introduction](https://pagescms.org/docs/)
[^configuration]: [Pages CMS — Configuration Overview](https://pagescms.org/docs/configuration/)
[^astro-pages]: [Astro — Deploy your Astro Site to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
