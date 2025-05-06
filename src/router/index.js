import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '@/stores/AuthStore'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },

  ],
})
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  // If the user is authenticated and tries to access the login page, redirect to Dashboard
  if (to.name == 'login' && authStore.isAuthenticated) {
    return { name: 'home' }
  }


  // If user is not authenticated, send them to notLoggedIn first (unless they're going to login)
  if (!authStore.isAuthenticated && to.name !== 'signIn' && to.name !== 'login') {
    return { name: 'login' }
  }


})

export default router
