import type { SchoolYear } from '../types';
import { EVENTS } from './events.ts';

export const schoolYears: SchoolYear[] = [
  {
    id: 1,
    year: 1,
    chapters: [
      {
        id: 1,
        chapterNumber: 1,
        events: {
          easy: EVENTS.slice(0, 6),
          hard: EVENTS.slice(6, 11),
        },
      },
      {
        id: 2,
        chapterNumber: 2,
        events: {
          easy: EVENTS.slice(11, 17),
          hard: EVENTS.slice(17, 21),
        },
      },
      {
        id: 3,
        chapterNumber: 3,
        events: {
          easy: EVENTS.slice(21, 26),
          hard: EVENTS.slice(26, 30),
        },
      },
      {
        id: 4,
        chapterNumber: 4,
        events: {
          easy: EVENTS.slice(30, 37),
          hard: EVENTS.slice(37, 42),
        },
      },
      {
        id: 5,
        chapterNumber: 5,
        events: {
          easy: EVENTS.slice(42, 48),
          hard: EVENTS.slice(48, 52),
        },
      },
    ],
  },
  {
    id: 2,
    year: 2,
    chapters: [
      {
        id: 6,
        chapterNumber: 1,
        events: {
          easy: EVENTS.slice(52, 58),
          hard: EVENTS.slice(58, 62),
        },
      },
      {
        id: 7,
        chapterNumber: 2,
        events: {
          easy: EVENTS.slice(62, 68),
          hard: EVENTS.slice(68, 72),
        },
      },
      {
        id: 8,
        chapterNumber: 3,
        events: {
          easy: EVENTS.slice(72, 78),
          hard: EVENTS.slice(78, 82),
        },
      },
      {
        id: 9,
        chapterNumber: 4,
        events: {
          easy: EVENTS.slice(82, 88),
          hard: EVENTS.slice(88, 92),
        },
      },
      {
        id: 10,
        chapterNumber: 5,
        events: {
          easy: EVENTS.slice(92, 98),
          hard: EVENTS.slice(98, 102),
        },
      },
      {
        id: 11,
        chapterNumber: 6,
        events: {
          easy: EVENTS.slice(102, 108),
          hard: EVENTS.slice(108, 112),
        },
      },
    ],
  },
];
