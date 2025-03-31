import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'generations',
      component: () => import('@/views/GenerationsPage.vue'),
    },
    {
      path: '/generation/:generationId',
      name: 'generation',
      component: () => import('@/views/GenerationPage.vue'),
    },
    {
      path: '/version/:versionId',
      name: 'version',
      component: () => import('@/views/VersionPage.vue'),
    },
  ],
});

export default router;
