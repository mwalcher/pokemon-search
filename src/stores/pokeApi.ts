import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { IsGenerationData, IsGenerationsData, IsMergedGenerationData } from '@/types/generation';
import type { IsApiItemReference } from '@/types/pokeApi';

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

  const getVersionsData = async (versionGroups: IsGenerationData['version_groups']) => {
    const versionGroupsData = await Promise.all(
      versionGroups.map(async (versionGroup) => {
        const versionGroupData = await getDataByUrl(versionGroup.url);
        if (versionGroupData) {
          versionGroupData.versions.map(async (version: IsApiItemReference) => {
            const versionData = await getDataByUrl(version.url);
            if (versionData) {
              console.log('versionData:', versionData);
            }
          });
        }
        return versionGroupData;
      }),
    );

    return versionGroupsData;
  };

  return { generations, getGenerationsData, getVersionsData };
});
