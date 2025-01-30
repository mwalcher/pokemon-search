<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import { usePokeApiStore } from '@/stores/pokeApi';
import type { IsMergedGenerationData } from '@/types/generation';
import { toCapitalCase } from '@/utilities/text';

const route = useRoute();
const router = useRouter();
const pokeApiStore = usePokeApiStore();
const { generations } = storeToRefs(pokeApiStore);

const generation = ref<IsMergedGenerationData>();

onMounted(async () => {
  const generationId = Number(route.params.id);
  generation.value = generations.value.find((gen) => gen.id === generationId);
  if (!generation.value) {
    router.push('/');
  }
});
</script>

<template>
  <template v-if="generation">
    <h1>{{ toCapitalCase(generation.main_region.name) }}</h1>
    <RouterLink to="/">All Generations</RouterLink>

    <pre>
    {{ Object.keys(generation) }}
    </pre>
  </template>
</template>
