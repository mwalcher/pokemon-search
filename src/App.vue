<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { RouterView } from 'vue-router';

import { usePokeApiStore } from '@/stores/pokeApi';

const pokeApiStore = usePokeApiStore();
const { getGenerationsData } = pokeApiStore;

const isPageLoading = ref(false);

onBeforeMount(async () => {
  isPageLoading.value = true;
  await getGenerationsData();
  isPageLoading.value = false;
});
</script>

<template>
  <main>
    <RouterView v-if="!isPageLoading" />
  </main>
</template>
