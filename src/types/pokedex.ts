import type {
  IsDescriptionData,
  IsName,
  IsNamedApiResource,
  IsNamesData,
  IsPokemonEntryData,
  IsUrl,
} from '@/types/pokeApi';

export interface IsPokedexData {
  descriptions: IsDescriptionData[];
  id: number;
  is_main_series: boolean;
  name: IsName;
  names: IsNamesData[];
  pokemon_entries: IsPokemonEntryData[];
  region: IsNamedApiResource;
  version_groups: IsNamedApiResource[];
}

export interface IsMergedPokedexData extends IsPokedexData {
  url: IsUrl;
}
