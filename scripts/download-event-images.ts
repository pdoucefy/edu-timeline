/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import { access, mkdir } from 'node:fs/promises';
import path from 'node:path';
// eslint-disable-next-line import/no-extraneous-dependencies
import sharp from 'sharp';

import { EVENTS } from '@/data/events.ts';
import type { Event } from '@/types/event.ts';

const WIKIPEDIA_API = 'https://fr.wikipedia.org/w/api.php';
const WIKIPEDIA_BASE_URL = 'https://fr.wikipedia.org/wiki/';

const USER_AGENT = 'WikiTriviaEventImageDownloader/1.0 (https://github.com/your-user/your-repo)';

const SEARCH_LIMIT = 5;
const REQUEST_DELAY_MS = 500;
const MAX_RETRIES = 3;

const IMAGE_WIDTH = 250;
const IMAGE_HEIGHT = 175;
const IMAGE_QUALITY = 90;

/**
 * Use this when an event's name doesn't correspond well to the Wikipedia
 * article we actually want.
 *
 * The key is the event ID and the value is the exact Wikipedia article title.
 */
const WIKIPEDIA_OVERRIDES: Record<number, string> = {
  1: 'Paléolithique inférieur',
  2: 'Homo habilis',
  3: 'Homo erectus',
  4: 'Homo sapiens',
  5: 'Néolithique',
  6: 'Antiquité',

  7: 'Domestication du feu',
  8: 'Domestication',
  9: 'Irrigation',
  10: 'Métallurgie',
  11: 'Stonehenge',

  12: 'Antiquité',
  13: 'Cité-État',
  14: 'Ziggurat',
  15: 'Épopée de Gilgamesh',
  16: 'Code de Hammurabi',
  17: 'Antiquité tardive',

  18: 'Égypte antique',
  19: "Pyramides d'Égypte",
  20: 'Histoire de la Chine',
  21: 'Écriture chinoise',

  22: 'Grèce antique',
  23: 'Jeux olympiques antiques',
  24: 'Démocratie athénienne',
  25: 'Première guerre médique',
  26: 'Alexandre le Grand',

  27: 'Homère',
  28: 'Guerre de Troie',
  29: 'Guerre du Péloponnèse',
  30: 'La République (Platon)',

  31: 'Fondation de Rome',
  32: 'République romaine',
  33: 'Assassinat de Jules César',
  34: 'Empire romain',
  35: 'Empire romain',
  36: "Division de l'Empire romain",
  37: "Chute de l'Empire romain d'Occident",

  38: 'Guerre des Gaules',
  39: 'Marc Aurèle',
  40: 'Constantin Ier (empereur romain)',
  41: 'Édit de Thessalonique',
  42: 'Chute de Constantinople',

  43: 'Crucifixion de Jésus',
  44: 'Clovis Ier',
  45: 'Conquêtes musulmanes',
  46: 'Couronnement impérial de Charlemagne',
  47: 'Première croisade',
  48: 'Premier voyage de Christophe Colomb',

  49: 'Commune médiévale',
  50: 'Hanse',
  51: 'Guerre de Cent Ans',
  52: 'Peste noire',

  53: 'Géocentrisme',
  54: 'Johannes Gutenberg',
  55: 'Éloge de la folie',
  56: '95 thèses',
  57: 'Inquisition',
  58: 'Guerres de Religion (France)',

  59: 'Platon',
  60: 'Réforme anglaise',
  61: 'Révolution copernicienne',
  62: 'Galilée',

  63: 'Marco Polo',
  64: 'Prise de Constantinople',
  65: 'Premier voyage de Christophe Colomb',
  66: "Conquête de l'Empire aztèque",
  67: 'Jacques Cartier',
  68: 'Population amérindienne',

  69: 'Caravelle',
  70: 'Traité de Tordesillas',
  71: 'Esclavage en Afrique',
  72: 'Tour du monde de Magellan',

  73: 'Siècle des Lumières',
  74: 'Boston Tea Party',
  75: "Guerre d'indépendance des États-Unis",
  76: 'Traité de Paris (1783)',
  77: 'Révolution française',
  78: "Coup d'État du 18 Brumaire",

  79: 'Guerre de la Conquête',
  80: "Déclaration d'indépendance des États-Unis",
  81: 'Bataille de Yorktown',
  82: 'Terreur (Révolution française)',

  83: 'Machine à vapeur',
  84: 'Locomotive à vapeur',
  85: 'Enclosure',
  86: 'Révolution industrielle',
  87: 'Manifeste du parti communiste',
  88: 'Syndicat',

  89: 'Combination Acts',
  90: 'Mule-jenny',
  91: 'Factory Act 1833',
  92: 'Salaire minimum',

  93: "Guerres d'indépendance en Amérique du Sud",
  94: 'Henry Morton Stanley',
  95: 'Conférence de Berlin',
  96: 'État indépendant du Congo',
  97: "Partage de l'Afrique",
  98: 'Première Guerre mondiale',

  99: 'Canal de Suez',
  100: 'Samory Touré',
  101: 'Révolte des Héréros et des Namas',
  102: 'Crises marocaines',

  103: 'Droit de vote des femmes',
  104: "Déclaration universelle des droits de l'homme",
  105: "Indépendance de l'Inde",
  106: 'Conférence de Bandung',
  107: 'Civil Rights Act de 1964',
  108: 'Apartheid',

  109: 'Suffragettes',
  110: 'Marche du sel',
  111: "Guerre d'Indochine",
  112: 'I Have a Dream',
};

type WikipediaSearchResult = {
  title: string;
  description: string | null;
  excerpt: string | null;
};

type WikipediaPage = {
  pageid: number;
  title: string;
  fullurl?: string;
  original?: {
    source: string;
    width: number;
    height: number;
  };
  pageimage?: string;
};

type WikipediaPageResponse = {
  query?: {
    pages?: WikipediaPage[];
  };
};

type WikipediaRestSearchResponse = {
  pages?: Array<{
    title: string;
    description?: string | null;
    excerpt?: string | null;
  }>;
};

/**
 * Sleep between Wikipedia requests.
 */
const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Make a fetch request with retries.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchWithRetry = async (url: URL, options?: any): Promise<Response> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'application/json',
          ...options?.headers,
        },
      });

      if (response.ok) return response;

      // Don't retry most 4xx errors.
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < MAX_RETRIES) {
      const delay = 1000 * attempt;
      console.log(`    Retry ${attempt}/${MAX_RETRIES} in ${delay}ms...`);
      await sleep(delay);
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Request failed');
};

/**
 * Normalize a string to make matching/searching a little more forgiving.
 */
const normalizeText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Remove some common wording that tends to make Wikipedia searches worse.
 */
const cleanEventName = (name: string): string =>
  name
    .replace(/\b(début de|début du|début des|début de l')\b/gi, '')
    .replace(/\b(apparition de|invention de|création du|création de)\b/gi, '')
    .replace(/\b(premier|première|premiers|premières)\b/gi, '')
    .replace(/\b(mise en place de|adoption de)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Generate several search queries for an event.
 */
const getSearchQueries = (event: Event): string[] => {
  const cleanedName = cleanEventName(event.name);

  return [event.name, cleanedName].filter(
    (query, index, queries) =>
      query.length > 0 &&
      queries.findIndex((candidate) => normalizeText(candidate) === normalizeText(query)) === index,
  );
};

/**
 * Search French Wikipedia for candidate articles.
 */
const searchWikipedia = async (query: string): Promise<WikipediaSearchResult[]> => {
  const url = new URL('/w/rest.php/v1/search/page', WIKIPEDIA_BASE_URL);

  url.searchParams.set('q', query);
  url.searchParams.set('limit', SEARCH_LIMIT.toString());

  const response = await fetchWithRetry(url);

  const data = (await response.json()) as WikipediaRestSearchResponse;

  return (data.pages ?? []).map((page) => ({
    title: page.title,
    description: page.description ?? null,
    excerpt: page.excerpt ?? null,
  }));
};

/**
 * Score how well a Wikipedia result matches the event.
 *
 * This is deliberately conservative: Wikipedia's own search ranking is the
 * primary signal. We only use the score to choose between our generated
 * search queries/results.
 */
const scoreSearchResult = (event: Event, result: WikipediaSearchResult, query: string): number => {
  const normalizedEvent = normalizeText(event.name);
  const normalizedTitle = normalizeText(result.title);
  const normalizedQuery = normalizeText(query);

  let score = 0;

  // Exact title match with the query.
  if (normalizedTitle === normalizedQuery) score += 100;

  // The title contains the query.
  if (normalizedTitle.includes(normalizedQuery)) score += 50;

  // The event name contains the title.
  if (normalizedEvent.includes(normalizedTitle)) score += 40;

  // The title contains important words from the event.
  const eventWords = normalizedEvent.split(' ').filter((word) => word.length >= 4);

  for (const word of eventWords) {
    if (normalizedTitle.includes(word)) {
      score += 10;
    }
  }

  return score;
};

/**
 * Get the Wikipedia page and its lead/original image.
 *
 * PageImages exposes the original image URL when available.
 */
const getWikipediaPage = async (title: string): Promise<WikipediaPage | null> => {
  const url = new URL(WIKIPEDIA_API);

  url.searchParams.set('action', 'query');
  url.searchParams.set('format', 'json');
  url.searchParams.set('formatversion', '2');
  url.searchParams.set('redirects', '1');
  url.searchParams.set('titles', title);
  url.searchParams.set('prop', 'pageimages|info');
  url.searchParams.set('piprop', 'name|original');
  url.searchParams.set('inprop', 'url');

  const response = await fetchWithRetry(url);

  const data = (await response.json()) as WikipediaPageResponse;

  return data.query?.pages?.[0] ?? null;
};

/**
 * Find the best Wikipedia article for an event.
 */
const findWikipediaPage = async (
  event: Event,
): Promise<{
  page: WikipediaPage;
  query: string;
} | null> => {
  const override = WIKIPEDIA_OVERRIDES[event.id];

  if (override) {
    console.log(`    Using override: "${override}"`);

    const page = await getWikipediaPage(override);

    if (!page) {
      throw new Error(`Wikipedia override "${override}" could not be found.`);
    }

    return {
      page,
      query: override,
    };
  }

  const queries = getSearchQueries(event);

  const candidates: Array<{
    result: WikipediaSearchResult;
    query: string;
    score: number;
  }> = [];

  for (const query of queries) {
    console.log(`    Searching: "${query}"`);

    const results = await searchWikipedia(query);

    for (const result of results) {
      candidates.push({
        result,
        query,
        score: scoreSearchResult(event, result, query),
      });
    }

    await sleep(REQUEST_DELAY_MS);
  }

  candidates.sort((a, b) => b.score - a.score);

  const bestCandidate = candidates.at(0);
  if (!bestCandidate) return null;

  const page = await getWikipediaPage(bestCandidate.result.title);
  if (!page) return null;

  return {
    page,
    query: bestCandidate.query,
  };
};

/**
 * Download an image to disk.
 */
/**
 * Download an image, resize it to the target dimensions, and convert it to JPEG.
 */
const downloadImage = async (imageUrl: string, outputPath: string): Promise<void> => {
  const response = await fetchWithRetry(new URL(imageUrl), {
    headers: {
      Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    },
  });

  const buffer = Buffer.from(await response.arrayBuffer());

  await sharp(buffer)
    .resize(IMAGE_WIDTH, IMAGE_HEIGHT, {
      fit: 'contain',
    })
    .jpeg({
      quality: IMAGE_QUALITY,
      mozjpeg: true,
    })
    .toFile(outputPath);
};

/**
 * Check whether a file exists.
 */
const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

const formatEventId = (id: number): string => id.toString().padStart(3, '0');

const wikipediaUrl = (title: string): string =>
  `${WIKIPEDIA_BASE_URL}${encodeURIComponent(title.replace(/ /g, '_'))}`;

const processEvent = async (
  event: Event,
  outputDirectory: string,
  force: boolean,
): Promise<void> => {
  const id = formatEventId(event.id);

  console.log('');
  console.log(`[${id}] ${event.name}`);

  const result = await findWikipediaPage(event);

  if (!result) {
    console.log('    ✗ No Wikipedia article found');
    return;
  }

  const { page } = result;

  console.log(`    → ${page.title}`);
  console.log(`    → ${wikipediaUrl(page.title)}`);

  if (!page.original?.source) {
    console.log('    ✗ Wikipedia article has no lead image');
    return;
  }

  const imageUrl = page.original.source;
  const outputPath = path.join(outputDirectory, `${id}.jpg`);

  if (!force && (await fileExists(outputPath))) {
    console.log(`    ✓ Already exists: ${path.basename(outputPath)}`);
    return;
  }

  console.log(`    → image: ${imageUrl}`);
  await downloadImage(imageUrl, outputPath);
  console.log(`    ✓ downloaded: ${outputPath}`);

  await sleep(REQUEST_DELAY_MS);
};

const parseArguments = (): {
  force: boolean;
} => {
  const args = process.argv.slice(2);

  const force = args.includes('--force');

  return { force };
};

const main = async (): Promise<void> => {
  const { force } = parseArguments();

  const absoluteOutputDirectory = path.resolve('public/events');

  console.log('Wikipedia Event Image Downloader');
  console.log('================================');
  console.log(`Events: ${EVENTS.length}`);
  console.log(`Output: ${absoluteOutputDirectory}`);
  console.log(`Force:  ${force}`);

  await mkdir(absoluteOutputDirectory, { recursive: true });

  let successful = 0;
  let failed = 0;

  for (const event of EVENTS) {
    try {
      await processEvent(event, absoluteOutputDirectory, force);

      successful++;
    } catch (error) {
      failed++;

      console.error(`    ✗ Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  console.log('');
  console.log('================================');
  console.log('Done');
  console.log(`Successful: ${successful}`);
  console.log(`Failed:     ${failed}`);
};

main();
