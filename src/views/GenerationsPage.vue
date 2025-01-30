<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';

import { usePokeApiStore } from '@/stores/pokeApi';

const pokeApiStore = usePokeApiStore();
const { getNameByLanguage } = pokeApiStore;
const { generations } = storeToRefs(pokeApiStore);
</script>

<template>
  <h1>Generations</h1>
  <ul>
    <li v-for="generation in generations" :key="generation.name">
      <RouterLink :to="`/generation/${generation.id}`">
        {{ getNameByLanguage(generation.names) }}: {{ generation.main_region.name }}
      </RouterLink>
    </li>
  </ul>
</template>
