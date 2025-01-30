<script setup lang="ts">
import { useChangeCase } from '@vueuse/integrations/useChangeCase';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import { usePokeApiStore } from '@/stores/pokeApi';
import type { IsMergedGenerationData } from '@/types/generation';

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
    <h1>{{ useChangeCase(generation.main_region.name, 'capitalCase') }}</h1>
    <RouterLink to="/">All Generations</RouterLink>

    <pre>
    {{ Object.keys(generation) }}
    </pre>
  </template>
</template>
