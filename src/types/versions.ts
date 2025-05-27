import type { IsName, IsNamedApiResource, IsNamesData, IsUrl } from '@/types/pokeApi';

export interface IsVersionGroupData {
  generation: IsNamedApiResource;
  id: number;
  move_learn_method: IsNamedApiResource[];
  name: IsName;
  order: number;
  pokedexes: IsNamedApiResource[];
  regions: IsNamedApiResource[];
  versions: IsNamedApiResource[];
}

export interface IsMergedVersionGroupData extends IsVersionGroupData {
  url: IsUrl;
}

export interface IsVersionData {
  id: number;
  name: IsName;
  names: IsNamesData[];
  version_group: IsNamedApiResource;
}

export interface IsMergedVersionData extends IsVersionData {
  url: IsUrl;
}

export type IsVersionStorageData = {
  generation_name: IsName;
  version_groups: IsMergedVersionGroupData[];
  versions: IsMergedVersionData[];
};
