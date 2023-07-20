<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import getUser from '@/auth/getUser'

import { useRouter } from 'vue-router'
import { ref } from 'vue'

// firebase imports
import { auth } from '@/api/config'
import { signOut } from 'firebase/auth'

    const { user } = getUser()
    //const router = useRouter()

    const handleClick = () => {
      signOut(auth)
    }

</script>

<template>
      <nav class="navigation">
        <AppNavbar />
        <!-- logged in users -->
        <div class="logIn" v-if="user">
          <div class="buttonList">
            <router-link to="/">Home</router-link>
            <router-link to="/Dashboard">Dashboard</router-link>
          </div>
          <div class="userList">
            <p v-if="user">logged in as {{ user.email }}</p>
            <button @click="handleClick">Logout</button>
          </div>
  
        </div>
        
        <!-- logged out users -->
        <div class="logNot" v-if="!user">
          <router-link to="/firstLog">Login</router-link>
          <router-link to="/firstLog">Signup</router-link>
        </div>
      </nav>
  </template>
  

  
  <style>
  nav {
    display: flex;
    align-items: center;
  }
  nav h1 {
    margin-right: auto;
    margin-bottom: 0;
  }
  nav a {
    margin-left: 16px;
    color: #2c3e50;
  }
  nav button {
    margin-left: 16px;
  }
  nav a.router-link-exact-active {
    color: #0ec58e;
  }
  nav + p {
    margin-top: 0;
    margin-bottom: 30px;
  }
  </style>