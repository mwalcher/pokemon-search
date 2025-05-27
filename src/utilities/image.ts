import type { IsMergedGenerationData } from '@/types/generation';
import type { IsPokemonEntryData } from '@/types/pokeApi';
import type { IsMergedVersionData, IsMergedVersionGroupData } from '@/types/versions';

export const getImageUrl = (baseUrl: string, path: string) => {
  return new URL(`../assets/${path}.png`, baseUrl).href;
};

export const getVersionPath = (version: IsMergedVersionData) => {
  return `versions/${version.version_group.name}/${version.name}`;
};

export const getPokemonPath = (
  generationName: IsMergedGenerationData['name'],
  versionGroupName: IsMergedVersionGroupData['name'] | IsMergedVersionData['name'],
  entryNumber: IsPokemonEntryData['entry_number'],
) => {
  return `pokemon/${generationName}/${versionGroupName}/${entryNumber}`;
};
