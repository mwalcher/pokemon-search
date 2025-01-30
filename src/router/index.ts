import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'generations',
      component: () => import('../views/GenerationsPage.vue'),
    },
    {
      path: '/generation/:id',
      name: 'generation',
      component: () => import('../views/GenerationPage.vue'),
    },
  ],
});

export default router;
