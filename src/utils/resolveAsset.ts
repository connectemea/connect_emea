import * as foundersImages from '@/assets/images/founders';
import * as internsImages from '@/assets/images/interns';
import * as eventImages from '@/assets/images/Events';
import * as usImages from '@/assets/images/Us';

// Helper to clean keys
const cleanKey = (name: string): string => name ? name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() : '';

const allAssets: Record<string, string> = {};

// Register founders
(Object.keys(foundersImages) as Array<keyof typeof foundersImages>).forEach(key => {
  allAssets[cleanKey(key as string)] = foundersImages[key] as string;
});

// Register interns
(Object.keys(internsImages) as Array<keyof typeof internsImages>).forEach(key => {
  allAssets[cleanKey(key as string)] = internsImages[key] as string;
});

// Register events
(Object.keys(eventImages) as Array<keyof typeof eventImages>).forEach(key => {
  allAssets[cleanKey(key as string)] = eventImages[key] as string;
});

// Register us/gallery
(Object.keys(usImages) as Array<keyof typeof usImages>).forEach(key => {
  allAssets[cleanKey(key as string)] = usImages[key] as string;
});

// Manual mappings for spelling differences or alternate names
allAssets['bootcamp'] = usImages.BootCamp as string;
allAssets['bootcamb'] = usImages.BootCamp as string;
allAssets['learningstation'] = eventImages.LearningStation as string;
allAssets['learning_station'] = eventImages.LearningStation as string;

/**
 * Resolves an image path or key. If it is a full URL, it returns it directly.
 * Otherwise, it looks it up in the bundled assets mapping.
 */
export function resolveAsset(imagePathOrKey: string | null | undefined): string | null {
  if (!imagePathOrKey) return null;
  if (
    typeof imagePathOrKey === 'string' &&
    (imagePathOrKey.startsWith('http://') || imagePathOrKey.startsWith('https://') || imagePathOrKey.startsWith('data:'))
  ) {
    return imagePathOrKey;
  }
  const key = cleanKey(imagePathOrKey);
  return allAssets[key] || imagePathOrKey;
}
