import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/config/new',
      name: 'config-create',
      component: () => import('../views/configs/CreateConfig.vue')
    }
  ]
})

export default router
