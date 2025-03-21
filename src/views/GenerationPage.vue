<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import { usePokeApiStore } from '@/stores/pokeApi';
import type { IsMergedGenerationData } from '@/types/generation';
import type { IsVersionStorageData } from '@/types/versions';
import { getNameByLanguage } from '@/utilities/pokeApi';
import { toCapitalCase } from '@/utilities/text';

const route = useRoute();
const router = useRouter();
const pokeApiStore = usePokeApiStore();
const { getVersionsData } = pokeApiStore;
const { generations, versionsByGeneration } = storeToRefs(pokeApiStore);

const generation = ref<IsMergedGenerationData>();
const versionData = ref<IsVersionStorageData>();

onMounted(async () => {
  const generationId = Number(route.params.id);
  generation.value = generations.value.find((gen) => gen.id === generationId);

  if (!generation.value) {
    router.push('/');
    return;
  }

  await getVersionsData(generation.value.name, generation.value.version_groups);
  versionData.value = versionsByGeneration.value.find((gen) => gen.generation_name === generation.value?.name);
});

function getImageUrl(id: string) {
  return new URL(`../assets/pokemon/generation-i/red-blue/${id}.png`, import.meta.url).href;
}
</script>

<template>
  <template v-if="generation">
    <h1>{{ toCapitalCase(generation.main_region.name) }} ({{ getNameByLanguage(generation.names) }})</h1>
    <RouterLink to="/">All Generations</RouterLink>
  </template>
  <ul v-if="versionData">
    <li v-for="version in versionData.versions" :key="version.name">
      <img :src="getImageUrl(version.id.toString())" :alt="version.name" />
      {{ version.name }}
    </li>
  </ul>
</template>
