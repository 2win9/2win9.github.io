import { getCollection, type CollectionEntry } from 'astro:content';

export const categories = [
  { id: 'notes', label: '공부 기록', description: '이해한 개념을 내 언어로.' },
  { id: 'logs', label: '개발 기록', description: '만들며 마주친 문제와 해결 과정.' },
  { id: 'thoughts', label: '생각', description: '개발 사이사이, 남겨 두고 싶은 이야기.' },
] as const;

export function withBase(path = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\/+/, '')}`;
}

export function postUrl(post: CollectionEntry<'posts'>) {
  return withBase(`posts/${encodeURI(post.id)}/`);
}

export async function getPosts() {
  return (await getCollection('posts', ({ data }) => data.published))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
      || a.id.localeCompare(b.id, 'ko'));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Seoul',
  }).format(date).replaceAll('-', '.');
}

export function categoryLabel(id: string) {
  return categories.find((item) => item.id === id)?.label || id;
}

export function httpsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : null;
  } catch { return null; }
}
