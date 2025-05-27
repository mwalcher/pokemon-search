import type {
  IsApiResource,
  IsDescriptionData,
  IsFlavorTextData,
  IsGenusData,
  IsName,
  IsNamedApiResource,
  IsNamesData,
  IsPalParkData,
  IsPokedexEntryData,
  IsPokemonSpeciesVarietyData,
  IsUrl,
} from '@/types/pokeApi';

export interface IsPokemonSpeciesData {
  base_happiness: number;
  capture_rate: number;
  color: IsNamedApiResource;
  egg_groups: IsNamedApiResource[];
  evolution_chain: IsApiResource;
  evolves_from_species: IsNamedApiResource | null;
  flavor_text_entries: IsFlavorTextData[];
  form_descriptions: IsDescriptionData[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: IsGenusData[];
  generation: IsNamedApiResource;
  growth_rate: IsNamedApiResource;
  habitat: IsNamedApiResource;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: IsName;
  names: IsNamesData[];
  order: number;
  pal_park_encounters: IsPalParkData[];
  pokedex_numbers: IsPokedexEntryData[];
  shape: IsNamedApiResource;
  varieties: IsPokemonSpeciesVarietyData[];
}

export interface IsMergedPokemonSpeciesData extends IsPokemonSpeciesData {
  url: IsUrl;
}
