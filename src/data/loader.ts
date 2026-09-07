export const PLACEHOLDER_IMAGE_PATH = '/events/placeholder.svg';

export const resolveImagePath = (fileName: string): string => {
  if (!fileName) return PLACEHOLDER_IMAGE_PATH;
  if (fileName.startsWith('/')) return fileName;
  return `/events/${fileName}`;
};
