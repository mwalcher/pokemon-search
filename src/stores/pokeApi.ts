import type {
  IsApiItemReference,
  IsGenerationData,
  IsGenerationsData,
  IsMergedGenerationData,
} from '@/types/generation';
import { defineStore } from 'pinia';
import { ref } from 'vue';

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
    const generationsData: IsGenerationsData = await getDataByUrl(`${apiBaseUrl}generation`);
    if (generationsData) {
      generationsData.forEach(async (generationData) => {
        const generation: IsGenerationData = await getDataByUrl(generationData.url);
        if (generation) {
          generations.value.push({ ...generation, url: generationData.url });
        }
      });
    }
  };

  return { generations, getGenerationsData, getNameByLanguage };
});
