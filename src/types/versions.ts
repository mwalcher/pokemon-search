import type { IsApiItemReference, IsName, IsNamesData, IsUrl } from '@/types/pokeApi';

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

export interface IsMergedVersionGroupData extends IsVersionGroupData {
  url: IsUrl;
}

export interface IsVersionData {
  id: number;
  name: IsName;
  names: IsNamesData;
  version_group: IsApiItemReference;
}

export interface IsMergedVersionData extends IsVersionData {
  url: IsUrl;
}

export type IsVersionStorageData = {
  generation_name: IsName;
  version_groups: IsMergedVersionGroupData[];
  versions: IsMergedVersionData[];
};
