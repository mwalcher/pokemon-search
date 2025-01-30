import type { IsGenerationData } from '@/types/generation';

export const getGenNameByLanguage = (names: IsGenerationData['names'], language = 'en') => {
  const name = names.find((name) => name.language.name === language);
  return name ? name.name : '';
};
