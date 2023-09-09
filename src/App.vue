<template>
  <div class="container-fluid">
    <div id="FlashMessage" v-if="GStore.flashMessage"> {{ GStore.flashMessage }}</div>
    <Swiping />
    <NewNav />
    <Borders />
    <router-view class="homethis animate__animated animate__delay animate__fadeIn" >
  </router-view>
  </div>
</template>
<script setup>
import { inject, ref, watchEffect, onMounted } from 'vue'

import { useTrackStore, useAuthorStore } from '@/store'
import { storeToRefs } from 'pinia';

import NewNav from "@/components/newNav.vue";
import Borders from "@/components/borders.vue";
import Swiping from "@/components/swiping.vue";

// GSTORE DA RIPOSIZIONARE

const GStore = inject('GStore')
let flashDiv



 async function flashMessageOut(){
   flashDiv = await document.getElementById('FlashMessage');
   if(flashDiv){
     setTimeout(()=>{
       flashDiv.classList.remove('animate__fadeInRight')
       flashDiv.classList.add('animate__fadeOut')
     },1500)
   }
 }


const TrackStore = useTrackStore()
const { Tracks } = storeToRefs(TrackStore)

const AuthorStore = useAuthorStore()
const { Authors } = storeToRefs(AuthorStore)

async function  searchHandler() {
	await TrackStore.getAllTracks('Number');
  await AuthorStore.getAllAuthors('Number');
}
onMounted(() => {
  searchHandler()
  watchEffect(() => {
   if(GStore){
     flashMessageOut()
   }
 })
       
})

/*
// manivel
VITE_API_KEY = "AIzaSyCbjIv3Y2dbuZngIMYXZPF7_iV2kaTp7CA"
VITE_AUTH_DOMAIN = "iwattz.firebaseapp.com"
VITE_PROJECT_ID = "iwattz"
VITE_STORAGE_BUCKET = "iwattz.appspot.com"
VITE_MESSAGING_SENDER_ID = "362039620361"
VITE_APP_ID = "1:362039620361:web:37b27cb04f447f13b999d8"
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID 
  */
</script>
<style lang="scss">
.homethis {
  padding: 0%;
  z-index: 9;
  margin: var(--marginT) var(--marginR) var(--marginB) var(--marginL) !important;
  width: calc(100vw - 15vw);
  height: calc(100vh - 16vh);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  align-self: center;
}
</style>
