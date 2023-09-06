import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from "@/views/About.vue";
import Services from "@/views/Services.vue";
import Contact from "@/views/Contact.vue";
import Selections from "@/views/Selections.vue";

// auth
import FirstLog from "@/views/auth/firstLog.vue";
import Dashboard from "@/views/auth/Dashboard.vue";

//Tracks
import CreateTrack from "@/views/auth/Tracks/createTrack.vue";
import EditTrack from "@/views/auth/Tracks/editTrack.vue";
import SelectedTrack from "@/views/SelectedTrack.vue";



//Authors
import CreateAuthor from "@/views/auth/Authors/createAuthor.vue";
import EditAuthor from "@/views/auth/Authors/editAuthor.vue";


// dashboard
import TracksDashboard from "@/views/auth/Tracks/Table.vue";
import AuthorsDashboard from "@/views/auth/Authors/Table.vue";


import NotFound from "@/views/404.vue";
import networkError from '@/views/NetworkError.vue'

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
    children: [
      { path: 'Tracks', name: 'TrackTable', component: TracksDashboard},
      { path: 'Authors', name: 'AuthorTable',component: AuthorsDashboard},
    
    ]
  },
  {
    path: '/dashboard/Tracks/create',
    name: 'createTrack',
    component: CreateTrack,
  },
  {
    path: '/dashboard/Author/create',
    name: 'createAuthor',
    component: CreateAuthor,
  },
  {
    path: '/dashboard/Tracks/edit:id',
    name: 'EditTrack',
    component: EditTrack,
    props: true,
  },
  {
    path: '/selections/Track:id',
    name: 'SelectedTrack',
    component: SelectedTrack,
    props: true,
  },
  {
    path: '/dashboard/Authors/edit:id',
    name: 'EditAuthor',
    component: EditAuthor,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
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
    component: networkError,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router
