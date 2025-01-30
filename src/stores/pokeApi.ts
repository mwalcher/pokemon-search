import { defineStore } from 'pinia';
import { ref } from 'vue';

import type {
  IsApiItemReference,
  IsGenerationData,
  IsGenerationsData,
  IsMergedGenerationData,
} from '@/types/generation';

export const usePokeApiStore = defineStore('pokeApi', () => {
  const apiBaseUrl = 'https://pokeapi.co/api/v2/';

  const generations = ref<IsMergedGenerationData[]>([]);

  const getDataByUrl = async (url: IsApiItemReference['url']) => {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  };

  const getNameByLanguage = (names: IsGenerationData['names'], language = 'en') => {
    const name = names.find((name) => name.language.name === language);
    return name ? name.name : '';
  };

  const getGenerationsData = async () => {
    if (generations.value.length) return;
    const generationsData: IsGenerationsData = await getDataByUrl(`${apiBaseUrl}generation`);
    if (generationsData) {
      await Promise.all(
        generationsData.results.map(async (generationData) => {
          const generation: IsGenerationData = await getDataByUrl(generationData.url);
          if (generation) {
            generations.value.push({ ...generation, url: generationData.url });
          }
        }),
      );

      generations.value.sort((a, b) => a.id - b.id);
    }
  };

  return { generations, getGenerationsData, getNameByLanguage };
});
