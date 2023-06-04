import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import history from '@/router/history'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  history.push(to);
  next();
})

export default router