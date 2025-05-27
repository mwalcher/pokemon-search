import type { IsNamesData } from '@/types/pokeApi';

export const getNameByLanguage = (names: IsNamesData[], language = 'en') => {
  const name = names.find((name) => name.language.name === language);
  return name ? name.name : '';
};
