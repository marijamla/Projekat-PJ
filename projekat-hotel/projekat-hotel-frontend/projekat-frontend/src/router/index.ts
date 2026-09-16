import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HotelDetailsView from '@/views/HotelDetailsView.vue'
import ReservationsView from '@/views/ReservationsView.vue'
import BookView from '@/views/BookView.vue'
import CodeView from '@/views/CodeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/hotel/:id/book', 
      name: 'book',
      component: BookView
    },
    {
      path: '/hotel/:id', 
      name: 'hotel',
      component: HotelDetailsView,
    },
    {
      path: '/reservations', 
      name: 'reservations',
      component: ReservationsView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

export default router
