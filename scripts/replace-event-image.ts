/* eslint-disable no-console */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 600;
const IMAGE_QUALITY = 90;

const main = async (): Promise<void> => {
  const [eventId, imageUrl] = process.argv.slice(2);

  if (!eventId || !imageUrl) {
    console.error('Usage: yarn tsx scripts/replace-event-image.ts <event-id> <image-url>');
    process.exit(1);
  }

  const parsedUrl = new URL(imageUrl);
  const formattedId = eventId.padStart(3, '0');

  const outputDirectory = path.resolve('public/events');
  const outputPath = path.join(outputDirectory, `${formattedId}.jpg`);

  console.log(`Downloading: ${parsedUrl}`);
  console.log(`Output:     ${outputPath}`);
  console.log(`Size:       ${IMAGE_WIDTH}x${IMAGE_HEIGHT}`);

  await mkdir(outputDirectory, { recursive: true });

  const response = await fetch(parsedUrl, {
    headers: {
      Accept: 'image/*',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download image: HTTP ${response.status} ${response.statusText}`);
  }

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

  console.log(`✓ Replaced ${formattedId}.jpg`);
};

main().catch((error: unknown) => {
  console.error(`✗ ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
