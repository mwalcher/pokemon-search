<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { usePokeApiStore } from '@/stores/pokeApi';
import type { IsMergedGenerationData } from '@/types/generation';
import type { IsMergedVersionData, IsMergedVersionGroupData, IsVersionStorageData } from '@/types/versions';
import { getImageUrl, getVersionPath } from '@/utilities/image';
import { getNameByLanguage } from '@/utilities/pokeApi';
import { toCapitalCase } from '@/utilities/text';

const baseUrl = import.meta.url;
const route = useRoute();
const router = useRouter();
const pokeApiStore = usePokeApiStore();
const { getVersionPokedexData } = pokeApiStore;
const { generations, versionsByGeneration, pokedexes } = storeToRefs(pokeApiStore);

const versionId = Number(route.params.versionId);
const generation = ref<IsMergedGenerationData>();
const generationVersionData = ref<IsVersionStorageData>();
const versionGroupData = ref<IsMergedVersionGroupData>();
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
  versionGroupData.value = generationVersionData.value.version_groups.find((group) =>
    group.versions.some((version) => version.name === versionData.value?.name),
  );
  generation.value = generations.value.find((gen) => gen.name === generationVersionData.value?.generation_name);

  if (!versionGroupData.value) {
    router.push('/');
    return;
  }

  await getVersionPokedexData(versionGroupData.value.pokedexes);
});
</script>

<template>
  <template v-if="versionData && generation">
    <h1>{{ toCapitalCase(getNameByLanguage(versionData.names)) }}</h1>
    <RouterLink :to="{ name: 'generation', params: { generationId: generation.id } }">
      Back to {{ getNameByLanguage(generation.names) }}
    </RouterLink>
    <img
      :class="$style['cover-art']"
      :src="getImageUrl(baseUrl, getVersionPath(versionData))"
      :alt="versionData.name"
    />
  </template>

  <h2>Pokedex</h2>
  <template v-for="pokedex in pokedexes" :key="pokedex.name">
    <h3>{{ toCapitalCase(pokedex.name) }}</h3>
    <ul>
      <li v-for="pokemon in pokedex.pokemon_entries" :key="pokemon.pokemon_species.name">
        {{ toCapitalCase(pokemon.pokemon_species.name) }}
      </li>
    </ul>
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
