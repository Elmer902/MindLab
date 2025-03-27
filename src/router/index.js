import { createRouter, createWebHistory } from 'vue-router'
import communityView from '@/views/communityView.vue';
import HealthView from '@/components/Health.vue';
import mealView from '@/views/mealView.vue';
import subscribeView from '@/views/subscribeView.vue';
import homeView from '@/views/HomeView.vue';
import signIn from '@/components/signIn.vue';
import mealPlanView from '@/views/mealPlanView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: HealthView,
      meta: { showSidebar: true }
    },
    {
      path: '/mealplan',
      name: 'mealplanview',
      component: mealPlanView,
      meta: { showSidebar: true }
    },
    {
      path: '/signin',
      name: 'signin',
      component: signIn,
      meta: { showSidebar: false }
    },
    {
      path: '/',
      name: 'home',
      component: homeView,
      meta: { showSidebar: false }
    },
    {
      path: '/meal',
      name: 'MealPlans',
      component: mealView,
      meta: { showSidebar: true }
    },
    {
      path: '/subscriptions',
      name: 'subscriptions',
      component: subscribeView,
      meta: { showSidebar: true }
    },
    {
      path: '/community',
      name: 'community',
      component: communityView,
      meta: { showSidebar: true }
    },
  ],
})


export default router;
