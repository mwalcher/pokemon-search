<script setup lang="ts">
import { usePokeApiStore } from '@/stores/pokeApi';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const pokeApiStore = usePokeApiStore();
const { getGenerationsData, getNameByLanguage } = pokeApiStore;
const { generations } = storeToRefs(pokeApiStore);

const isPageLoading = ref(false);

onMounted(async () => {
  isPageLoading.value = true;
  await getGenerationsData();
  isPageLoading.value = false;
});
</script>

<template>
  <h1>Generations</h1>
  <div v-if="!isPageLoading">
    <ul>
      <li v-for="generation in generations" :key="generation.name">
        <RouterLink :to="`/generation/${generation.id}`">
          {{ getNameByLanguage(generation.names) }}: {{ generation.main_region.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
