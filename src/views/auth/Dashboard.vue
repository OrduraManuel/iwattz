<script setup>
import { watchEffect, onMounted, ref } from 'vue';

import toBack from "@/components/toBack.vue";

import { useAuthorStore, useTrackStore } from '@/store'
import { storeToRefs } from 'pinia';

// Gestione Authors
const AuthorStore = useAuthorStore()
const { Authors } = storeToRefs(AuthorStore)
const { AuthorsLimit } = storeToRefs(AuthorStore)
const { nextAuthors } = storeToRefs(AuthorStore)
const { prevAuthors } = storeToRefs(AuthorStore)
const { Author } = storeToRefs(AuthorStore) // for manage the modal's opening

// Gestione Tracks
const TrackStore = useTrackStore()
const { Tracks } = storeToRefs(TrackStore)
const { TracksLimit } = storeToRefs(TrackStore)
const { nextTracks } = storeToRefs(TrackStore)
const { prevTracks } = storeToRefs(TrackStore)
const { Track } = storeToRefs(TrackStore) // for manage the modal's opening


async function  searchHandler() {
	await AuthorStore.getAllAuthors('Number')
  await TrackStore.getAllTracks('Number')
  .then(()=>{
console.log('dont do nothing please')
  })
}
onMounted(() => {
  watchEffect(() => {
    Authors.value = null;
    Tracks.value = null;
    searchHandler();
  });
});
</script>
<template>
  <div id="dashboard">
    <div class="container-fluid">
      <toBack where="/" />
      <div class="tabs row">
        <div class="col-12">
          <div class="links">
            <router-link type="button" :to="{name: 'TrackTable'}"><span>Tracks</span></router-link>
            <router-link :to="{name: 'AuthorTable'}"><span>Authors</span></router-link>            
            <!--<router-link to="404"><span>Img Manager</span></router-link>-->
          </div>
        </div>
      </div>
      <div class="content row">
        <div class="col-12">
          <div class="content">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#dashboard {
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  .row{
  display:flex;
  justify-content: flex-start;
  padding: 2vw 2vh!important;
  }

  .links{
    width: 100%;
    height: var(--marginT);
    display:flex;
    justify-content: space-around;
    align-items: center;
    a{
      color: var(--txtLight);
      padding: .5rem 1.5rem;
      border: var(--border);
      transition: .6s all ease-in-out;
      &:hover{
        cursor: pointer;
        color: var(--txtDark);
        background: var(--txtLight);
        transform: skew(-20deg, 0deg);
        border: none;
        transition: .4s all ease-in-out;
        span{
          transform: skew(20deg, 0deg);
        }
      }
    }
    .router-link-active{
      cursor: pointer;
        color: var(--txtDark);
        background: var(--txtLight);
        transform: skew(-20deg, 0deg);
        border: none;
        transition: .4s all ease-in-out;
        span{
          transform: skew(20deg, 0deg);
        }
    }
  }
  .content{
    //background: rgba(255,255,255,.5);
    width: 100%;
    height: 100%;
  }
}
</style>
