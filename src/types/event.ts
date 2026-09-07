import type { ID } from './id';

export type Event = {
  id: ID;
  name: string;
  year: number;
  // TODO: Consider adding a Date object for more precise date handling (invalid dates for very ancient events)
  // date: Date;
  fileName: string;
};
