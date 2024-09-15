import { defineStore } from 'pinia';

export const usePokeApiStore = defineStore('pokeApi', () => {
  const apiBaseUrl = 'https://pokeapi.co/api/v2/';

  const getGenerationsList = async () => {
    const response = await fetch(`${apiBaseUrl}generation`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      return data.results;
    }
  };

  return { getGenerationsList };
});
