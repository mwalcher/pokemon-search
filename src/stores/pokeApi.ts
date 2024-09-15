import type { IsGenerationData, IsGenerationsData } from '@/types/generation';
import { defineStore } from 'pinia';

export const usePokeApiStore = defineStore('pokeApi', () => {
  const apiBaseUrl = 'https://pokeapi.co/api/v2/';

  const getAllGenerations = async () => {
    const response = await fetch(`${apiBaseUrl}generation`, {
      method: 'GET',
    });

    if (response.ok) {
      const data: { results: IsGenerationsData } = await response.json();
      return data.results;
    }
  };

  const getGenerationByName = async (name: string) => {
    const response = await fetch(`${apiBaseUrl}generation/${name}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data: IsGenerationData = await response.json();
      return data;
    }
  };

  return { getAllGenerations, getGenerationByName };
});
