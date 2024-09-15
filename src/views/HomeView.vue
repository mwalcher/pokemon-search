<script setup lang="ts">
import { usePokeApiStore } from '@/stores/pokeApi';
import { onMounted, ref } from 'vue';

const pokeApiStore = usePokeApiStore();
const { getAllGenerations, getGenerationByName } = pokeApiStore;

const isPageLoading = ref(false);
const generations = ref([]);

const getGenerationsList = async () => {
  isPageLoading.value = true;
  const generationsData = await getAllGenerations();
  generationsData.forEach(async (generationData) => {
    const generation = await getGenerationByName(generationData.name);
    const generationName = generation.names.find((name) => name.language.name === 'en').name;
    generations.value.push({
      name: generationName,
    });
  });
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
      </li>
    </ul>
  </div>
</template>
