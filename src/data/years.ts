/**
 * PLACEHOLDER CONTENT — Replace with real curriculum data.
 *
 * This file contains sample placeholder content used during development
 * to make the game fully playable. All events, dates, and images are
 * illustrative and should be replaced with real French history curriculum
 * content supplied by teachers / the client.
 *
 * Date representation: Event.date is a Date object constructed directly
 * here. Months are 0-indexed in JavaScript (0 = January, 11 = December).
 */
import type { SchoolYear } from '../types';

const PLACEHOLDER_IMAGE = '/events/placeholder.svg';

export const schoolYears: SchoolYear[] = [
  {
    id: 1,
    year: 2024,
    chapters: [
      {
        id: 2,
        chapterNumber: 1,
        events: {
          easy: [
            {
              id: 10,
              name: 'Bataille de Vouillé',
              date: new Date('0507-01-01T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 11,
              name: 'Couronnement de Charlemagne',
              date: new Date('0800-12-25T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 12,
              name: 'Traité de Verdun',
              date: new Date('0843-08-10T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 13,
              name: 'Bataille de Hastings',
              date: new Date('1066-10-14T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 14,
              name: 'Bataille de Bouvines',
              date: new Date('1214-07-27T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 15,
              name: 'Début de la Guerre de Cent Ans',
              date: new Date('1337-01-01T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 16,
              name: "Bataille d'Azincourt",
              date: new Date('1415-10-25T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
          ],
          hard: [
            {
              id: 17,
              name: 'Sac de Rome par les Wisigoths',
              date: new Date('0410-08-24T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 18,
              name: 'Bataille de Tolbiac',
              date: new Date('0496-01-01T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 19,
              name: "Couronnement d'Hugues Capet",
              date: new Date('0987-07-03T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
          ],
        },
      },
      {
        id: 3,
        chapterNumber: 2,
        events: {
          easy: [
            {
              id: 20,
              name: "Découverte de l'Amérique",
              date: new Date('1492-10-12T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 21,
              name: 'Bataille de Marignan',
              date: new Date('1515-09-13T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 22,
              name: 'Édit de Nantes',
              date: new Date('1598-04-13T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 23,
              name: 'Siège de La Rochelle',
              date: new Date('1628-09-01T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 24,
              name: 'Règne de Louis XIV',
              date: new Date('1643-05-14T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 25,
              name: "Révocation de l'Édit de Nantes",
              date: new Date('1685-10-18T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 26,
              name: 'Bataille de Fontenoy',
              date: new Date('1745-05-11T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
          ],
          hard: [
            {
              id: 27,
              name: 'Affaire des Poisons',
              date: new Date('1679-01-01T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 28,
              name: 'Paix de Ryswick',
              date: new Date('1697-09-20T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 29,
              name: "Traité d'Utrecht",
              date: new Date('1713-04-11T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
          ],
        },
      },
      {
        id: 4,
        chapterNumber: 3,
        events: {
          easy: [
            {
              id: 30,
              name: 'Prise de la Bastille',
              date: new Date('1789-07-14T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 31,
              name: "Déclaration des Droits de l'Homme",
              date: new Date('1789-08-26T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 32,
              name: 'Exécution de Louis XVI',
              date: new Date('1793-01-21T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 33,
              name: 'Chute de Robespierre',
              date: new Date('1794-07-27T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 34,
              name: "Coup d'État du 18 Brumaire",
              date: new Date('1799-11-09T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 35,
              name: 'Bataille de Marengo',
              date: new Date('1800-06-14T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 36,
              name: 'Couronnement de Napoléon',
              date: new Date('1804-12-02T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
          ],
          hard: [
            {
              id: 37,
              name: 'Serment du Jeu de Paume',
              date: new Date('1789-07-14T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 38,
              name: 'La Terreur',
              date: new Date('1793-09-05T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 39,
              name: 'Bataille des Pyramides',
              date: new Date('1798-07-21T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
          ],
        },
      },
    ],
  },
  {
    id: 5,
    year: 2025,
    chapters: [
      {
        id: 6,
        chapterNumber: 1,
        events: {
          easy: [
            {
              id: 40,
              name: 'Bataille de Waterloo',
              date: new Date('1815-06-18T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 41,
              name: 'Révolution de Juillet',
              date: new Date('1830-07-27T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 42,
              name: 'Révolution de 1848',
              date: new Date('1848-02-22T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 43,
              name: "Coup d'État de Louis-Napoléon Bonaparte",
              date: new Date('1851-12-02T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 44,
              name: 'Guerre de Crimée',
              date: new Date('1853-10-16T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 45,
              name: 'Bataille de Sedan',
              date: new Date('1870-09-01T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 46,
              name: 'Proclamation de la IIIe République',
              date: new Date('1870-09-04T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
          ],
          hard: [
            {
              id: 47,
              name: 'Loi Falloux',
              date: new Date('1850-03-15T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 48,
              name: 'Exposition Universelle',
              date: new Date('1889-05-06T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 49,
              name: 'Affaire Dreyfus',
              date: new Date('1894-12-19T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
          ],
        },
      },
      {
        id: 7,
        chapterNumber: 2,
        events: {
          easy: [
            {
              id: 50,
              name: 'Entente Cordiale',
              date: new Date('1904-04-08T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 51,
              name: 'Bataille de la Marne',
              date: new Date('1914-09-06T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 52,
              name: 'Traité de Versailles',
              date: new Date('1919-06-28T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 53,
              name: 'Front populaire',
              date: new Date('1936-05-03T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 54,
              name: 'Appel du 18 Juin',
              date: new Date('1940-06-18T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 55,
              name: 'Débarquement de Normandie',
              date: new Date('1944-06-06T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 56,
              name: 'Fin de la Seconde Guerre mondiale',
              date: new Date('1945-05-08T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
          ],
          hard: [
            {
              id: 57,
              name: 'Crise de Munich',
              date: new Date('1938-09-29T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 58,
              name: 'Régime de Vichy',
              date: new Date('1940-07-10T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 59,
              name: 'Conférence de Yalta',
              date: new Date('1945-02-04T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
          ],
        },
      },
      {
        id: 8,
        chapterNumber: 3,
        events: {
          easy: [
            {
              id: 50,
              name: 'Entente Cordiale',
              date: new Date('1904-04-08T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 60,
              name: 'Création de la CECA',
              date: new Date('1951-04-18T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 61,
              name: "Guerre d'Algérie",
              date: new Date('1954-11-01T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 62,
              name: 'Crise du 13 Mai 1958',
              date: new Date('1958-05-13T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 63,
              name: 'Élection de Charles de Gaulle',
              date: new Date('1958-05-13T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 64,
              name: 'Mai 68',
              date: new Date('1968-05-01T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 65,
              name: 'Première élection de Mitterrand',
              date: new Date('1981-05-10T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
          ],
          hard: [
            {
              id: 66,
              name: 'Traité de Maastricht',
              date: new Date('1992-02-07T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 67,
              name: "Accords d'Évian",
              date: new Date('1962-03-18T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
            {
              id: 68,
              name: 'Chute du Mur de Berlin',
              date: new Date('1989-11-09T00:00:00Z'),
              fileName: PLACEHOLDER_IMAGE,
            },
          ],
        },
      },
    ],
  },
];
