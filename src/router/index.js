import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        title: 'Home'
    },
    {
        path: '/test_forms',
        name: 'test_forms',
        component: () => import('../views/TestForms.vue'),
        title: 'Test forms'
    },
    {
        path: '/test_forms_model',
        name: 'test_forms_model',
        component: () => import('../views/TestFormsModel.vue'),
        title: 'Test forms (model)',
    },
    {
        path: '/test_short_links',
        name: 'test_short_links',
        component: () => import('../views/TestShortLinks.vue'),
        title: 'Test Short Links',
    }
  ]
})

export default router
