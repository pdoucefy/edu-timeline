import type { Event } from '@/types/event.ts';

export const PLACEHOLDER_IMAGE_PATH = '/events/placeholder.svg';

export const resolveImagePath = (event: Event): string =>
  `/events/${String(event.id).padStart(3, '0')}.jpg`;
