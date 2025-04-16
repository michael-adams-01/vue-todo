import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/signin' },
    { path: '/home', component: Home },
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
  ],
})

export default router
