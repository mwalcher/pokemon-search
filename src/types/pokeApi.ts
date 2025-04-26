export type IsName = string;
export type IsUrl = string;

export type IsApiResource = {
  url: IsUrl;
};

export interface IsNamedApiResource extends IsApiResource {
  name: IsName;
}

export type IsNamesData = {
  language: IsNamedApiResource;
  name: IsName;
}[];

export type IsFlavorTextData = {
  flavor_text: string;
  language: IsNamedApiResource;
  version: IsNamedApiResource;
}[];

export type IsDescriptionData = {
  description: string;
  language: IsNamedApiResource;
}[];

export type IsGenusData = {
  genus: string;
  language: IsNamedApiResource;
}[];

export type IsPalParkData = {
  area: IsNamedApiResource;
  base_score: number;
  rate: number;
}[];

export type IsPokedexEntryData = {
  entry_number: number;
  pokedex: IsNamedApiResource;
}[];

export type IsPokemonSpeciesVarietyData = {
  is_default: boolean;
  pokemon: IsNamedApiResource;
}[];
