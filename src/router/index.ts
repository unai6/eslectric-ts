import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'electricBalance',
      component: () => import('@/views/ElectricBalanceView.vue'),
    },
  ],
})

export default router
