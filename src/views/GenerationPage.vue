<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { usePokeApiStore } from '@/stores/pokeApi';
import type { IsMergedGenerationData } from '@/types/generation';

const route = useRoute();
const pokeApiStore = usePokeApiStore();
const { generations } = storeToRefs(pokeApiStore);

const generation = ref<IsMergedGenerationData>();

onMounted(async () => {
  const generationId = Number(route.params.id);
  generation.value = generations.value.find((gen) => gen.id === generationId);
});
</script>

<template>
  <h1>Generation</h1>
  <RouterLink to="/">All Generations</RouterLink>

  <pre>
    {{ generation }}
  </pre>
</template>
