<script setup lang="ts">
import { usePokeApiStore } from '@/stores/pokeApi';
import { onMounted, ref } from 'vue';

const pokeApiStore = usePokeApiStore();
const { getGenerationsList } = pokeApiStore;

const generations = ref([]);

onMounted(async () => {
  generations.value = await getGenerationsList();
});
</script>

<template>
  <h1>Home</h1>
  <div>
    <ul>
      <li v-for="generation in generations" :key="generation.name">
        <button>{{ generation.name }}</button>
      </li>
    </ul>
  </div>
</template>
