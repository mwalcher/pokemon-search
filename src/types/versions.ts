import type { IsApiItemReference, IsName, IsNamesData } from '@/types/pokeApi';

export interface IsVersionGroupData {
  generation: IsApiItemReference;
  id: number;
  move_learn_method: IsApiItemReference[];
  name: IsName;
  order: number;
  pokedexes: IsApiItemReference[];
  regions: IsApiItemReference[];
  versions: IsApiItemReference[];
}

export interface IsVersionData {
  id: number;
  name: IsName;
  names: IsNamesData;
  version_group: IsApiItemReference;
}
