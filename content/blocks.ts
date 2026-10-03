import type { Block } from './types';

export const p = (text: string): Block => ({ type: 'p', text });
export const h3 = (text: string): Block => ({ type: 'h3', text });
export const list = (...items: string[]): Block => ({ type: 'list', items });
export const video = (src: string, poster?: string): Block => ({ type: 'video', src, poster });
export const images = (...imgs: { src: string; alt: string }[]): Block => ({ type: 'images', images: imgs });
