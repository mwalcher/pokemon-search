<script setup lang="ts">
import { usePokeApiStore } from '@/stores/pokeApi';
import { onMounted, ref } from 'vue';

import type { IsGenerationData } from '@/types/generation';

const pokeApiStore = usePokeApiStore();
const { getAllGenerations, getGenerationByName } = pokeApiStore;

const isPageLoading = ref(false);
const generations = ref<{ name: IsGenerationData['name']; region: IsGenerationData['main_region']['name'] }[]>([]);

const getGenerationsList = async () => {
  isPageLoading.value = true;
  const generationsData = await getAllGenerations();
  if (generationsData) {
    generationsData.forEach(async (generationData) => {
      const generation = await getGenerationByName(generationData.name);
      if (generation) {
        const englishName = generation.names.find((name) => name.language.name === 'en');
        if (englishName) {
          generations.value.push({
            name: englishName.name,
            region: generation.main_region.name,
          });
        }
      }
    });
  }
  isPageLoading.value = false;
};

onMounted(async () => {
  await getGenerationsList();
});
</script>

<template>
  <h1>Home</h1>
  <div v-if="!isPageLoading">
    <ul>
      <li v-for="generation in generations" :key="generation.name">
        <button>{{ generation.name }}</button>
        <pre>{{ generation }}</pre>
      </li>
    </ul>
  </div>
</template>
