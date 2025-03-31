<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const versionId = Number(route.params.versionId);
</script>

<template>
  <h1>Version Name: {{ versionId }}</h1>
</template>
