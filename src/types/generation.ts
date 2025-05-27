import type { IsName, IsNamedApiResource, IsNamesData, IsUrl } from '@/types/pokeApi';

export interface IsGenerationData {
  abilities: IsNamedApiResource[];
  id: number;
  main_region: IsNamedApiResource;
  moves: IsNamedApiResource[];
  name: IsName;
  names: IsNamesData[];
  pokemon_species: IsNamedApiResource[];
  types: IsNamedApiResource[];
  version_groups: IsNamedApiResource[];
}

export type IsGenerationsData = {
  count: number;
  results: IsNamedApiResource[];
};

export interface IsMergedGenerationData extends IsGenerationData {
  url: IsUrl;
}
