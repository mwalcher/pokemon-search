<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';

import { usePokeApiStore } from '@/stores/pokeApi';
import { getGenNameByLanguage } from '@/utilities/pokeApi';
import { toCapitalCase } from '@/utilities/text';

const pokeApiStore = usePokeApiStore();
const { generations } = storeToRefs(pokeApiStore);
</script>

<template>
  <h1>Generations</h1>
  <ul>
    <li v-for="generation in generations" :key="generation.name">
      <RouterLink :to="`/generation/${generation.id}`">
        {{ getGenNameByLanguage(generation.names) }}: {{ toCapitalCase(generation.main_region.name) }}
      </RouterLink>
    </li>
  </ul>
</template>
