import { type RemovableRef, useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import type { IsGenerationData, IsGenerationsData, IsMergedGenerationData } from '@/types/generation';
import type { IsApiItemReference, IsName, IsUrl } from '@/types/pokeApi';
import type {
  IsMergedVersionData,
  IsMergedVersionGroupData,
  IsVersionData,
  IsVersionGroupData,
  IsVersionStorageData,
} from '@/types/versions';

const apiBaseUrl = 'https://pokeapi.co/api/v2/';

export const usePokeApiStore = defineStore('pokeApi', () => {
  const generations: RemovableRef<IsMergedGenerationData[]> = useStorage('pokeApi_generations', []);
  const versionsByGeneration: RemovableRef<IsVersionStorageData[]> = useStorage('pokeApi_versions', []);

  const getDataByUrl = async (url: IsUrl) => {
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

  const getVersionsData = async (generationName: IsName, versionGroups: IsApiItemReference[]) => {
    if (versionsByGeneration.value.some((generation) => generation.generation_name === generationName)) return;

    const versionGroupsArray: IsMergedVersionGroupData[] = [];
    const versionsArray: IsApiItemReference[] = [];
    const versionsDateArray: IsMergedVersionData[] = [];

    await Promise.all(
      versionGroups.map(async (versionGroup) => {
        const versionGroupData: IsVersionGroupData = await getDataByUrl(versionGroup.url);
        if (versionGroupData && versionGroupData.name.includes('-japan') === false) {
          versionGroupsArray.push({ ...versionGroupData, url: versionGroup.url });
          versionsArray.push(...versionGroupData.versions);
        }
      }),
    );

    await Promise.all(
      versionsArray.map(async (version) => {
        const versionData: IsVersionData = await getDataByUrl(version.url);
        if (versionData) {
          versionsDateArray.push({ ...versionData, url: version.url });
        }
      }),
    );

    versionsByGeneration.value.push({
      generation_name: generationName,
      version_groups: versionGroupsArray.sort((a, b) => a.id - b.id),
      versions: versionsDateArray.sort((a, b) => a.id - b.id),
    });
  };

  return { generations, versionsByGeneration, getGenerationsData, getVersionsData };
});
