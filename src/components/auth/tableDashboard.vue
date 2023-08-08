<script setup>
import { search, remove } from '@/api/crud';
import { watchEffect, ref } from 'vue';

import basicModal from '@/components/auth/basicModal.vue';

import loader from '@/components/loader.vue';

async function  searchHandler() {
	Tracks.value = await search('Tracks');
}

let sel = ref(null);
let Tracks = ref([]);


function activeModal(thisTrack){
	sel.value = thisTrack;
}

watchEffect( () =>{
	Tracks = ref(null);
	sel = ref(null);
	if(Tracks){
		searchHandler();
	}
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
    :thisTrack='sel' 
    /> <!-- !== null || sel !== undefined-->

  </template>
    <!--v-if=' sel !== null'-->
</template>