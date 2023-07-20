import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import about from "@/views/About.vue";
import services from "@/views/Services.vue";
import contact from "@/views/Contact.vue";
import selections from "@/views/Selections.vue";

// auth
import firstLog from "@/views/auth/firstLog.vue";
import Dashboard from "@/views/auth/Dashboard.vue";
import Create from "@/views/auth/createObj.vue";

import TrackDetails from "@/views/tracks/TrackDetails.vue";

import NotFound from "@/views/404.vue";

// firebase imports
import { auth } from '@/api/config'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if(!user) {
    next({ 
      name: 'firstLog'
    })
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: "/firstLog",
      name: "firstLog",
      component: firstLog,
    },
    {
      path: "/Dashboard",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: requireAuth,
    },
    {
      path: "/Create",
      name: "Create",
      component: Create,
      beforeEnter: requireAuth,
    },
    {
      path: "/track/:id",
      name: "TrackDetails",
      component: TrackDetails,
      props: true,
    },
    {
      path: "/about",
      name: "about",
      component: about,
    },
    {
      path: "/services",
      name: "services",
      component: services,
    },
    {
      path: "/contact",
      name: "contact",
      component: contact,
    },
    {
      path: "/selections",
      name: "selections",
      component: selections,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
  ],
})


export default router
