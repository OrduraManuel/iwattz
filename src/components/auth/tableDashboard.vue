<script setup>
import { useTrackStore } from '@/store'
import { storeToRefs } from 'pinia';

import { watchEffect, onMounted, ref } from 'vue';

import basicModal from '@/components/auth/basicModal.vue';
import tableItem from '@/components/auth/tableItem.vue';

import loader from '@/components/loader.vue';


const TrackStore = useTrackStore()
const { Tracks } = storeToRefs(TrackStore)
const { TracksLimit } = storeToRefs(TrackStore)
const { nextTracks } = storeToRefs(TrackStore)
const { prevTracks } = storeToRefs(TrackStore)
const { Track } = storeToRefs(TrackStore) // for manage the modal's opening

async function  searchHandler() {
	await TrackStore.getAllTracks('Number')
  .then(()=>{
console.log('dont do nothing please')
  })
}
async function  limitHandler() {
  await TrackStore.getLimitedTracks( perPage.value, 'Number')
  .then(()=>{
    console.log('questo è tracklimit: ',TracksLimit.value)
    prevBtn.value.classList.add('disabled')
    nextBtn.value.classList.remove('disabled')
  })
}
async function  nextHandler() {
  await TrackStore.getNextTracks( perPage.value, 'Number',nextTracks.value)
  .then(async ()=>{
    prevBtn.value.classList.remove('disabled')
    let firstTracks = Tracks.value[0]
    let lastTracks = Tracks.value[Tracks.value.length - 1]
    let nextTracksId = await Reflect.get(nextTracks.value,'id')
    console.log('questo è reflect NEXT: ', nextTracksId,'lastTracks: ', lastTracks.id )

    if( lastTracks.id == nextTracksId){
      console.log('siamo uguali disabilitiamo il NEXT')
      nextBtn.value.classList.add('disabled')
    }
    let prevTracksId = await Reflect.get(prevTracks.value,'id')
    console.log('questo è reflect PREV: ', prevTracksId,'firstTracks: ', firstTracks )
    if( firstTracks.id != prevTracksId){
      console.log('siamo uguali disabilitiamo il PREV')
      prevBtn.value.classList.remove('disabled')
    }
  })
}
async function  prevHandler() {
  await TrackStore.getPrevTracks( perPage.value, 'Number',prevTracks.value)
  .then(()=>{
    let firstTracks = Tracks.value[0]
    let lastTracks = Tracks.value[Tracks.value.length - 1]
    let nextTracksId = Reflect.get(nextTracks.value,'id')
    if( lastTracks.id != nextTracksId){
      console.log('siamo uguali disabilitiamo il btnNext')
      nextBtn.value.classList.remove('disabled')
    }
    let prevTracksId = Reflect.get(prevTracks.value,'id')
    if( firstTracks.id == prevTracksId){
      console.log('siamo uguali disabilitiamo il btnNext')
      prevBtn.value.classList.add('disabled')
    }
  })
}
const prevBtn = ref()
const nextBtn = ref()

//let sel = ref(null);
let LimitTracks = [3,4,5,10];
let perPage = ref(3);


function activeModal(thisTrack){
  //! Non si può aggiorare la const Track
	// Track = thisTrack;
}

watchEffect( () =>{
	Tracks.value = null;
  //perPage.value = 1;
	Track.value = null;
		searchHandler();
    limitHandler();
});


</script>
<template>
  <div class='table-responsive'>

    <table class='tableDashboard' v-if='TracksLimit'>
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
      <tr v-for='TrackLimit in TracksLimit' :key='TrackLimit.id'>
        <tableItem :thisTrack='TrackLimit'/>
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
    <table v-else>
        <loader>
          <i class="fa fa-spinner" aria-hidden="true"></i>
        </loader>  
    </table>
  </div>
    <nav class="mx-auto my-5" aria-label="Page navigation example">
      <ul class="pagination pagination-lg justify-content-center" >
        <li class="page-item">
          <select v-model="perPage" value="3" class="page-link">
            <option v-for="LimitTrack in LimitTracks" :value="LimitTrack" :key="LimitTrack.id">
              {{ LimitTrack }}
            </option>
          </select>
        </li>
        <li class="page-item">
          <a class="page-link  disabled" ref="prevBtn" href="#" aria-label="Previous"  @click="prevHandler">
            <span aria-hidden="true">PREV</span>
          </a>
        </li>
        <li class="page-item" >
          <a class="page-link "  ref="nextBtn"  href="#" aria-label="Next" @click="nextHandler">
            <span aria-hidden="true">NEXT</span>
          </a>
        </li>
      </ul>
    </nav>
 
  <template>
    <basicModal 
    :thisTrack='TrackLimit' 
    /> <!-- !== null || sel !== undefined-->

  </template>
    <!--v-if=' sel !== null'-->
</template>
<style scoped lang="scss">
table{
  tbody{
    tr{

        @include delay(slideInRight, 3, .35s); 
    }
  }
}
.pagination{
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.post {
  width: 220px;
  height: 80px;
}
.post .avatar {
  float: left;
  width: 52px;
  height: 52px;
  background-color: #ccc;
  border-radius: 25%;
  margin: 8px;
  background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
  background-size: 600px;
  animation: shine-avatar 1.6s infinite linear;
}
.post .line {
  float: left;
  width: 140px;
  height: 16px;
  margin-top: 12px;
  border-radius: 7px;
  background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
  background-size: 600px;
  animation: shine-lines 1.6s infinite linear;
}
.post .avatar + .line {
  margin-top: 11px;
  width: 100px;
}
.post .line ~ .line {
  background-color: #ddd;
}

@keyframes shine-lines {
  0% {
    background-position: -100px;
  }
  40%, 100% {
    background-position: 140px;
  }
}
@keyframes shine-avatar {
  0% {
    background-position: -32px;
  }
  40%, 100% {
    background-position: 208px;
  }
}
</style>