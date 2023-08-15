<script setup>
import { useTrackStore } from '@/store'
import { storeToRefs } from 'pinia';

import { watchEffect, ref } from 'vue';

import basicModal from '@/components/auth/basicModal.vue';
import loader from '@/components/loader.vue';

async function  searchHandler() {
	await TrackStore.getAllTracks();
}
async function  limitHandler() {
  LimitTracks.value = await getLimited('Tracks', 3, 'Number');
}

const TrackStore = useTrackStore()
const { Tracks } = storeToRefs(TrackStore)
const { Track } = storeToRefs(TrackStore) // for manage the modal's opening

//let sel = ref(null);
let LimitTracks = ref();


function activeModal(thisTrack){
	Track = thisTrack;
}

watchEffect( () =>{
	Tracks.value = null;
  LimitTracks.value = null;
	Track.value = null;
		searchHandler();
});


</script>
<template>
  <div class='table-responsive'>
    <table class='tableDashboard' v-if='Tracks'>
    <thead>
      <tr class='tableHead'>
        <th class='col colNumber'>#</th>
        <th class='col'>Author</th>
        <th class='col'>Title</th>
        <th class='col'>isFav</th>
        <th class='col'>Image</th>
        <th class='col'>Url</th>
        <th class='col'>Action</th>
        <th class='col'></th>

      </tr>
    </thead>
    <tbody>
      <tr v-for='Track in Tracks' :key='Track.id'>
        <td class='td tdNumber text-truncate'>{{Track.Number}}</td>
        <td class='td text-truncate'>{{Track.Author}}</td>
        <td class='td text-truncate'>{{Track.Title}}</td>
        <td class='td text-truncate'>{{Track.isFav}}</td>
        <td class='td text-truncate'>
            <img :src="Track.Image" style="width: 80px"/>
        </td>
        <td class='td text-truncate'><a :href="Track.Src" target="_blank">Spotify</a></td>

        <td class='td'>
          <router-link class='my-auto btn btn-success' :to='{ name:"TrackDetails", params: {id: Track.id}}'> edit</router-link>
        </td>
        <!--
        <td class='td'>
          <button
          class='my-auto btn btn-success' 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal"
          @click='activeModal(Track)'> edit in modal</button>
        </td>
                  data-bs-toggle='modal' 
          data-bs-target='#exampleModal' -->
      </tr>
    </tbody>
    </table>    
    <table v-if="!Tracks">
        <loader />  
    </table>
  </div>
  <template>
    <basicModal 
    :thisTrack='Track' 
    /> <!-- !== null || sel !== undefined-->

  </template>
    <!--v-if=' sel !== null'-->
</template>