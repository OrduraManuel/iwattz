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

import NewNav from "@/components/NewNav.vue";
import Borders from "@/components/Borders.vue";
//import Slider from '@/components/Slider.vue';
import Swiping from "@/components/Swiping.vue";

// GSTORE DA RIPOSIZIONARE

const GStore = inject('GStore')
let flashDiv

 watchEffect(() => {
   if(GStore){
     flashMessageOut()
   }
 })

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

const AuthorStore = useTrackStore()
const { Authors } = storeToRefs(AuthorStore)

async function  searchHandler() {
	await TrackStore.getAllTracks('Number');
  await AuthorStore.getAllTracks('Number');
}
onMounted(() => {
        searchHandler()
})
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
