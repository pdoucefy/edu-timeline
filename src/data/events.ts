import { Event } from '@/types/event.ts';

const PLACEHOLDER_IMAGE = '/events/placeholder.svg';

// TODO: Replace placeholder image with actual event images
export const EVENTS: Event[] = [
  {
    // Sec 1
    // Chapter 1 easy
    id: 1,
    name: 'Début du paléolithique',
    year: -3000000,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 2,
    name: "Apparition de l'homo habilis",
    year: -2500000,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 3,
    name: "Apparition de l'homo erectus",
    year: -1350000,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 4,
    name: "Apparition de l'homo sapiens",
    year: -300000,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 5,
    name: 'Début du néolithique',
    year: -10000,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 6,
    name: "Fin de la préhistoire, début de l'antiquité",
    year: -3500,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 1 hard
  {
    id: 7,
    name: 'Les humains apprennent à contrôler le feu',
    year: -750000,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 8,
    name: 'Début de la domestication des animaux',
    year: -8000,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 9,
    name: "Développement de l'irrigation",
    year: -7000,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 10,
    name: 'Développement de la métallurgie',
    year: -4000,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 11,
    name: 'Construction de Stonehenge',
    year: -2500,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 2 easy
  {
    id: 12,
    name: "Début de l'antiquité",
    year: -3500,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 13,
    name: 'Premières cités-États en Mésopotamie',
    year: -3000,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 14,
    name: 'Premiers zigourats',
    year: -2100,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 15,
    name: "Rédaction de l'épopée de Gilgamesh",
    year: -2000,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 16,
    name: "Mise en place du code d'Hammourabi",
    year: -1400,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 17,
    name: "Fin de l'antiquité",
    year: -27,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 2 hard
  {
    id: 18,
    name: 'Début de la civilisation égyptienne',
    year: -3200,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 19,
    name: 'Construction des pyramides',
    year: -2500,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 20,
    name: 'Début de la civilisation chinoise',
    year: -2200,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 21,
    name: "Invention de l'écriture chinoise",
    year: -1300,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 3 easy
  {
    id: 22,
    name: 'Début de la civilisation grecque',
    year: -800,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 23,
    name: 'Premiers jeux olympiques',
    year: -776,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 24,
    name: 'Début de la démocratie à Athènes',
    year: -507,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 25,
    name: 'Première guerre médique contre les Perses',
    year: -490,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 26,
    name: "Conquêtes d'Alexandre le Grand, fin de la démocratie à Athènes",
    year: -336,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 3 hard
  {
    id: 27,
    name: "Rédaction de l'Iliade et de l'Odyssée par Homère",
    year: -750,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 28,
    name: 'Guerre de Troie (présumée)',
    year: -1344,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 29,
    name: "Fin de la guerre du Péloponnèse et de la domination d'Athènes",
    year: -404,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 30,
    name: 'Rédaction de la République par Platon',
    year: -375,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 4 easy
  {
    id: 31,
    name: 'Fondation de Rome',
    year: -753,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 32,
    name: 'Début de la République romaine',
    year: -509,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 33,
    name: 'Assassinat de Jules César, guerre civile dans la République',
    year: -44,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 34,
    name: "Fondation de l'Empire romain",
    year: -27,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 35,
    name: "Expansion maximale de l'Empire romain",
    year: 200,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 36,
    name: "Division de l'Empire romain en deux régions : Occident et Orient",
    year: 395,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 37,
    name: "Fin de l'Empire romain d'Occident",
    year: 476,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 4 hard
  {
    id: 38,
    name: 'Conquête de la Gaule par Jules César',
    year: -58,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 39,
    name: 'Mort de Marc-Aurèle, le dernier des cinq "bons empereurs',
    year: 180,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 40,
    name: "Conversion de l'empereur Constantin au christianisme",
    year: 313,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 41,
    name: "Le christianisme devient la religion officielle de l'Empire romain",
    year: 391,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 42,
    name: "Chute de l'Empire romain d'Orient",
    year: 1453,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 5 easy
  {
    id: 43,
    name: 'Mort de Jésus',
    year: 33,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 44,
    name: 'Conversion de Clovis',
    year: 496,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 45,
    name: 'Début des conquêtes musulmanes',
    year: 632,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 46,
    name: 'Couronnement de Charlemagne',
    year: 800,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 47,
    name: 'Première croisade',
    year: 1095,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 48,
    name: 'Premier voyage de Christophe Colomb - fin du Moyen-Âge',
    year: 1492,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 5 hard
  {
    id: 49,
    name: 'Première commune',
    year: 1030,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 50,
    name: 'Première hanse marchande (regroupement de marchands)',
    year: 1161,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 51,
    name: 'Début de la guerre de cent ans',
    year: 1337,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 52,
    name: 'Épidémie de peste noire',
    year: 1347,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Sec 2
  // Chapter 1 easy
  {
    id: 53,
    name: 'Création du modèle du géocentrisme par Ptolémée',
    year: 141,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 54,
    name: "Perfectionnement de l'imprimerie par Gutenberg",
    year: 1450,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 55,
    name: "L'Éloge de la folie d'Érasme (début de l'humanisme)",
    year: 1511,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 56,
    name: 'Les 95 thèses de Martin Luther - début de la réforme protestante',
    year: 1517,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 57,
    name: "Mise en place par le pape de l'inquisition pour combattre les protestants (contre-réforme)",
    year: 1542,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 58,
    name: 'Début des guerres de religion entre catholiques et protestants',
    year: 1562,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 1 hard
  {
    id: 59,
    name: "Traduction de l'oeuvre de Platon (philosophe grec)",
    year: 1491,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 60,
    name: "Le roi d'Angleterre Henri VIII quite l'Église catholique et fonde l'Église anglicane pour pouvoir divorcer",
    year: 1534,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 61,
    name: "Démonstration de l'héliocentrisme par Copernic",
    year: 1543,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 62,
    name: "Confirmation de l'héliocentrisme par Galilée",
    year: 1610,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 2 easy
  {
    id: 63,
    name: "Marco Polo raconte sa visite de l'Asie dans Le livre des merveilles",
    year: 1295,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 64,
    name: 'Prise de Constantinople par les turcs, blocus commercial',
    year: 1453,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 65,
    name: 'Premier voyage de Christophe Colomb en Amérique',
    year: 1492,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 66,
    name: "Conquête de l'Empire aztèque au Mexique par Hernán Cortés",
    year: 1521,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 67,
    name: 'Exploration du fleuve Saint-Laurent par Jacques Cartier',
    year: 1534,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 68,
    name: 'La population autochtone en Amérique a chuté de 90%',
    year: 1600,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 2 hard
  {
    id: 69,
    name: 'Invention de la caravelle',
    year: 1430,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 70,
    name: "Traité de Tordesillas (division du monde entre l'Espagne et le Portugal)",
    year: 1494,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 71,
    name: 'Les premiers esclaves africains arrivent à Cuba',
    year: 1513,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 72,
    name: 'Premier tour du monde par Fernand de Magellan',
    year: 1522,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 3 easy
  {
    id: 73,
    name: 'Début des Lumières',
    year: 1715,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 74,
    name: 'Boston Tea Party',
    year: 1773,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 75,
    name: "Début de la guerre d'indépendance américaine",
    year: 1775,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 76,
    name: 'Traité de Paris (les États-Unis deviennent un pays indépendant)',
    year: 1783,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 77,
    name: "Révolution française : prise de la bastille et déclaration des droits de l'homme et du citoyen",
    year: 1789,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 78,
    name: 'Napoléon prend le pouvoir et met fin à la démocratie en France',
    year: 1799,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 3 hard
  {
    id: 79,
    name: 'Fin de la guerre de la Conquête (Treize colonies contre la Nouvelle-France)',
    year: 1763,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 80,
    name: "Déclaration d'indépendance des colonies",
    year: 1776,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 81,
    name: "Bataille de Yorktown (défaite de l'Angleterre contre les révolutionnaires américains)",
    year: 1781,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 82,
    name: 'La Terreur : la Révolution française tombe dans le chaos',
    year: 1793,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 4 easy
  {
    id: 83,
    name: 'Invention de la machine à vapeur',
    year: 1769,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 84,
    name: 'Première locomotive à vapeur',
    year: 1814,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 85,
    name: "Lois d'enclosure",
    year: 1815,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 86,
    name: "Début de l'industrialisation en France",
    year: 1830,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 87,
    name: 'Publication du Manifeste du parti communiste par Karl Marx',
    year: 1848,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 88,
    name: 'Loi autorisant les syndicats',
    year: 1871,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 4 hard
  {
    id: 89,
    name: 'Loi interdisant les syndicats',
    year: 1799,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 90,
    name: 'Invention de la mule-jerry, une machine qui produit du tissu',
    year: 1779,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 91,
    name: 'Loi limitant le travail des enfants',
    year: 1833,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 92,
    name: 'Instauration du salaire minimum',
    year: 1910,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 5 easy
  {
    id: 93,
    name: "Indépendance de la plupart des colonies d'Amérique du Sud",
    year: 1825,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 94,
    name: "Exploration de l'Afrique par Henry Stanley",
    year: 1878,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 95,
    name: "Conférence de Berlin sur le partage de l'Afrique",
    year: 1884,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 96,
    name: 'Prise de possession du Congo par le roi de Belgique, Léopold 2',
    year: 1885,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 97,
    name: "Presque tout le continent africain est contrôlé par l'Europe",
    year: 1913,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 98,
    name: 'Première guerre mondiale',
    year: 1914,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 5 hard
  {
    id: 99,
    name: 'Construction du canal de Suez',
    year: 1869,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 100,
    name: "Opposition de Samory Touré à l'armée coloniale française en Afrique de l'Ouest",
    year: 1898,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 101,
    name: 'Révolte du peuple Héréro contre les colonisateurs allemands',
    year: 1904,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 102,
    name: "Conflit entre la France et l'Allemagne au Maroc",
    year: 1905,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 6 easy
  {
    id: 103,
    name: 'Obtention du droit de vote des femmes en Angleterre et au Canada',
    year: 1918,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 104,
    name: "Adoption de la Déclaration universelle des droits de l'homme par l'ONU",
    year: 1948,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 105,
    name: "Indépendance de l'Inde",
    year: 1947,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 106,
    name: 'Conférence de Badung',
    year: 1955,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 107,
    name: 'Adoption du Civil Rights Act qui met fin à la ségrégation aux États-Unis',
    year: 1964,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 108,
    name: "Abolition de l'apartheid",
    year: 1991,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Chapter 6 hard
  {
    id: 109,
    name: 'Première association de suffragettes en Angleterre',
    year: 1903,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 110,
    name: 'Marche du sel de Gandhi en Inde',
    year: 1931,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 111,
    name: "Indépendance de l'Indochine",
    year: 1954,
    fileName: PLACEHOLDER_IMAGE,
  },
  {
    id: 112,
    name: 'Discours "I have a dream" de Martin Luther King',
    year: 1963,
    fileName: PLACEHOLDER_IMAGE,
  },
  // Sec 3
  // Sec 4
  // Sec 5
];
