<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { usePokeApiStore } from '@/stores/pokeApi';
import type { IsMergedVersionData, IsVersionStorageData } from '@/types/versions';
import { getImageUrl, getVersionPath } from '@/utilities/image';
import { getNameByLanguage } from '@/utilities/pokeApi';
import { toCapitalCase } from '@/utilities/text';

const baseUrl = import.meta.url;
const route = useRoute();
const router = useRouter();
const pokeApiStore = usePokeApiStore();
const { versionsByGeneration } = storeToRefs(pokeApiStore);

const versionId = Number(route.params.versionId);
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
});
</script>

<template>
  <template v-if="versionData">
    <h1>{{ toCapitalCase(getNameByLanguage(versionData.names)) }}</h1>
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
