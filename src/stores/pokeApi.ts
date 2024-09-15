import type { IsGenerationData, IsGenerationsData, IsMergedGenerationData } from '@/types/generation';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePokeApiStore = defineStore('pokeApi', () => {
  const apiBaseUrl = 'https://pokeapi.co/api/v2/';

  const generations = ref<IsMergedGenerationData[]>([]);

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

  const getNameByLanguage = (names: IsGenerationData['names'], language = 'en') => {
    const name = names.find((name) => name.language.name === language);
    return name ? name.name : '';
  };

  const getGenerationsData = async () => {
    const generationsData = await getAllGenerations();
    if (generationsData) {
      generationsData.forEach(async (generationData) => {
        const generation = await getGenerationByName(generationData.name);
        if (generation) {
          generations.value.push({ ...generation, url: generationData.url });
        }
      });
    }
  };

  return { generations, getGenerationsData, getNameByLanguage };
});
