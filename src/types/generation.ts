import type { IsApiItemReference, IsName, IsNamesData, IsUrl } from '@/types/pokeApi';

export interface IsGenerationData {
  abilities: IsApiItemReference[];
  id: number;
  main_region: IsApiItemReference;
  moves: IsApiItemReference[];
  name: IsName;
  names: IsNamesData;
  pokemon_species: IsApiItemReference[];
  types: IsApiItemReference[];
  version_groups: IsApiItemReference[];
}

export type IsGenerationsData = {
  count: number;
  results: IsApiItemReference[];
};

export interface IsMergedGenerationData extends IsGenerationData {
  url: IsUrl;
}
