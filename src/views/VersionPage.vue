<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { usePokeApiStore } from '@/stores/pokeApi';
import type { IsMergedGenerationData } from '@/types/generation';
import type { IsMergedVersionData, IsVersionStorageData } from '@/types/versions';
import { getImageUrl, getVersionPath } from '@/utilities/image';
import { getNameByLanguage } from '@/utilities/pokeApi';
import { toCapitalCase } from '@/utilities/text';

const baseUrl = import.meta.url;
const route = useRoute();
const router = useRouter();
const pokeApiStore = usePokeApiStore();
const { generations, versionsByGeneration } = storeToRefs(pokeApiStore);

const versionId = Number(route.params.versionId);
const generation = ref<IsMergedGenerationData>();
const generationVersionData = ref<IsVersionStorageData>();
const versionData = ref<IsMergedVersionData>();

onMounted(async () => {
  if (!versionId) {
    router.push('/');
    return;
  }

  generationVersionData.value = versionsByGeneration.value.find((gen) =>
    gen.versions.some((version) => version.id === versionId),
  );

  if (!generationVersionData.value) {
    router.push('/');
    return;
  }

  versionData.value = generationVersionData.value.versions.find((version) => version.id === versionId);
  generation.value = generations.value.find((gen) => gen.name === generationVersionData.value?.generation_name);
});
</script>

<template>
  <template v-if="versionData && generation">
    <h1>{{ toCapitalCase(getNameByLanguage(versionData.names)) }}</h1>
    <RouterLink :to="{ name: 'generation', params: { generationId: generation.id } }">
      Back to {{ getNameByLanguage(generation.names) }}: {{ toCapitalCase(generation.main_region.name) }}
    </RouterLink>
    <img
      :class="$style['cover-art']"
      :src="getImageUrl(baseUrl, getVersionPath(versionData))"
      :alt="versionData.name"
    />
  </template>
</template>

<style module>
.cover-art {
  display: block;
  width: 100%;
  max-width: 10rem;
  margin-top: 1rem;
}
</style>
