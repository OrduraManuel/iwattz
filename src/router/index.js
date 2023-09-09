import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
import About from "@/views/about.vue";
import Services from "@/views/services.vue";
import Contact from "@/views/contact.vue";
import Selections from "@/views/selections.vue";

// auth
import FirstLog from "@/views/auth/firstLog.vue";
import Dashboard from "@/views/auth/dashboard.vue";

//Tracks
import CreateTrack from "@/views/auth/tracks/createTrack.vue";
import EditTrack from "@/views/auth/tracks/editTrack.vue";
import SelectedTrack from "@/views/selectedTrack.vue";



//Authors
import CreateAuthor from "@/views/auth/authors/createAuthor.vue";
import EditAuthor from "@/views/auth/authors/editAuthor.vue";


// dashboard
import TracksDashboard from "@/views/auth/tracks/table.vue";
import AuthorsDashboard from "@/views/auth/authors/table.vue";


import NotFound from "@/views/404.vue";
import NetworkError from '@/views/networkError.vue'

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
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/services',
    name: 'services',
    component: Services,
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
  },
  {
    path: '/selections',
    name: 'selections',
    component: Selections,
  },
  {
    path: '/firstLog',
    name: 'firstLog',
    component: FirstLog,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: requireAuth,
    children: [
      { path: 'tracks', name: 'trackTable', component: TracksDashboard},
      { path: 'authors', name: 'authorTable',component: AuthorsDashboard},
    
    ]
  },
  {
    path: '/dashboard/tracks/create',
    name: 'createTrack',
    component: CreateTrack,
  },
  {
    path: '/dashboard/author/create',
    name: 'createAuthor',
    component: CreateAuthor,
  },
  {
    path: '/dashboard/tracks/edit:id',
    name: 'editTrack',
    component: EditTrack,
    props: true,
  },
  {
    path: '/selections/track/:id',
    name: 'selectedTrack',
    component: SelectedTrack,
    props: true,
  },
  {
    path: '/dashboard/authors/edit:id',
    name: 'editAuthor',
    component: EditAuthor,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/networkError',
    name: 'networkError',
    component: NetworkError,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router
