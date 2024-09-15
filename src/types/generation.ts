export type IsName = string;

export interface IsApiItemReference {
  name: IsName;
  url: string;
}

export interface IsGenerationData {
  abilities: any[];
  id: number;
  main_region: IsApiItemReference;
  moves: IsApiItemReference[];
  name: IsName;
  names: {
    language: IsApiItemReference;
    name: IsName;
  }[];
  pokemon_species: IsApiItemReference[];
  types: IsApiItemReference[];
  version_groups: IsApiItemReference[];
}

export type IsGenerationsData = IsApiItemReference[];
