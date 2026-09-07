import { PLACEHOLDER_IMAGE_PATH, resolveImagePath } from '@/data/loader.ts';

describe('resolveImagePath', () => {
  it('resolves a plain fileName to /events/<fileName>', () => {
    expect(resolveImagePath('placeholder.svg')).toBe('/events/placeholder.svg');
    expect(resolveImagePath('battle.jpg')).toBe('/events/battle.jpg');
  });

  it('returns the path unchanged if already absolute', () => {
    expect(resolveImagePath('/events/placeholder.svg')).toBe('/events/placeholder.svg');
  });

  it('falls back to the placeholder for an empty fileName', () => {
    expect(resolveImagePath('')).toBe(PLACEHOLDER_IMAGE_PATH);
  });
});
