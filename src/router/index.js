import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from "@/views/About.vue";
import Services from "@/views/Services.vue";
import Contact from "@/views/Contact.vue";
import Selections from "@/views/Selections.vue";

// auth
import FirstLog from "@/views/auth/FirstLog.vue";
import Dashboard from "@/views/auth/Dashboard.vue";
import CreateObj from "@/views/auth/CreateObj.vue";
import TrackDetails from "@/views/tracks/TrackDetails.vue";
import NotFound from "@/views/404.vue";

// firebase imports
import { auth } from '@/api/config'

const redirectToLogin = (next) => {
  next({
    name: 'firstLog',
    query: { redirect: next.fullPath }
  });
};

const requireAuth = async (to, from, next) => {
  const user = auth.currentUser;

  if (!user) {
    redirectToLogin(next);
  } else {
    try {
      next();
    } catch (error) {
      console.error('Error while checking user authentication:', error);
      redirectToLogin(next);
    }
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/selections',
    name: 'Selections',
    component: Selections,
  },
  {
    path: '/firstLog',
    name: 'FirstLog',
    component: FirstLog,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: requireAuth,
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateObj,
    beforeEnter: requireAuth,
  },
  {
    path: '/track/:id',
    name: 'TrackDetails',
    component: TrackDetails,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    name: 'Not Found',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router
