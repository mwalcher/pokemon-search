import { defineStore } from 'pinia';

export const usePokeApiStore = defineStore('pokeApi', () => {
  const apiBaseUrl = 'https://pokeapi.co/api/v2/';

  const getAllGenerations = async () => {
    const response = await fetch(`${apiBaseUrl}generation`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      return data.results;
    }
  };

  const getGenerationByName = async (name: string) => {
    if (!name) return '';

    const response = await fetch(`${apiBaseUrl}generation/${name}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  };

  return { getAllGenerations, getGenerationByName };
});
