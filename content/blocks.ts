import type { Block, PhoneItem } from './types';

export const p = (text: string): Block => ({ type: 'p', text });
export const h3 = (text: string): Block => ({ type: 'h3', text });
export const list = (...items: string[]): Block => ({ type: 'list', items });
export const video = (src: string, poster?: string): Block => ({ type: 'video', src, poster });
export const images = (...imgs: { src: string; alt: string }[]): Block => ({ type: 'images', images: imgs });
export const phoneRow = (...items: PhoneItem[]): Block => ({ type: 'phoneRow', items });
export const phoneVideo = (src: string, label: string, poster?: string): PhoneItem => ({ kind: 'video', src, poster, label });
export const phoneImage = (src: string, label: string, alt?: string): PhoneItem => ({ kind: 'image', src, alt: alt ?? label, label });
