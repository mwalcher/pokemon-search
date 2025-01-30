<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import { usePokeApiStore } from '@/stores/pokeApi';
import type { IsMergedGenerationData } from '@/types/generation';
import { getNameByLanguage } from '@/utilities/pokeApi';
import { toCapitalCase } from '@/utilities/text';

const route = useRoute();
const router = useRouter();
const pokeApiStore = usePokeApiStore();
const { getVersionsData } = pokeApiStore;
const { generations } = storeToRefs(pokeApiStore);

const generation = ref<IsMergedGenerationData>();
const versions = ref();

onMounted(async () => {
  const generationId = Number(route.params.id);
  generation.value = generations.value.find((gen) => gen.id === generationId);

  if (!generation.value) {
    router.push('/');
    return;
  }

  versions.value = await getVersionsData(generation.value.version_groups);
});
</script>

<template>
  <template v-if="generation">
    <h1>{{ toCapitalCase(generation.main_region.name) }} ({{ getNameByLanguage(generation.names) }})</h1>
    <RouterLink to="/">All Generations</RouterLink>
    <pre>
    {{ Object.keys(generation) }}
    </pre>
    <ul>
      <li v-for="version in versions" :key="version.name">
        <pre>{{ version }}</pre>
      </li>
    </ul>
  </template>
</template>
