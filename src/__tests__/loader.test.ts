import { resolveImagePath } from '@/data/loader.ts';
import { Event } from '@/types/event.ts';

const event: Event = {
  id: 1,
  name: 'Bataille de Vouillé',
  year: 507,
};

describe('resolveImagePath', () => {
  it('resolves the image path for an event', () => {
    expect(resolveImagePath(event)).toBe('/events/001.jpg');
  });
});
