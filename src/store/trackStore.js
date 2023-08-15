import { defineStore } from 'pinia';
//import axios from 'axios';
import { ref, watch } from 'vue';
import { useRouter } from "vue-router";

import { create, search, remove, update, get } from "@/api/crud";


export const useTrackStore = defineStore('trackStore', () => {


    const router = useRouter();

    const Tracks = ref([]);
    const Track = ref({test: 'assorreta'});
    const Pagination = ref(); // we'll use for create a call with pagination in dashboard: Number element in page / Tracks.length = Number of page to scroll

    const numberOfTracks = () =>{ 
      return Tracks.value.length
    }
    const createTrack = async (newTrack) => {
      return await create('Tracks', newTrack)
      .then(() =>{
        Tracks.value.push(newTrack);
        alert('Well done! You have create this Track!')
        router.push('/dashboard');
      })
      .catch(error =>{
        throw error;
      }); 
    }
    const deleteTrack = async (thisTrack) =>{
      return await remove('Tracks', thisTrack)
      .then(async () =>{
        console.log(Tracks.value,'this is tracks value PRIMA FILTER')
        const updateTracks = await Tracks.value.filter((x) => {
          console.log(Tracks.value,'this is tracks value DURANTE FILTER')
          return x.thisTrack !== thisTrack
        })
        console.log(updateTracks,'this is updateTracks')
        Tracks.value = updateTracks
        alert('Well done! You have delete this Track!')
      })
      .catch(error =>{
        throw error;
      }); 
    }
    //update = (collectionRef, id, item)
    const updateTrack = async (id, editTrack) =>{
      return await update('Tracks', id, editTrack)
      .then(response => {
        console.log('questo è editTrack: ',editTrack)
        alert('Well done! You have edit this Track!')
      })
      .catch((error) => {
        throw error;
      })
    }
    const getTrack = async (id) =>{
      const getId = await Tracks.value.filter((x) => {
        return x.id === id 
      })
      let item = JSON.parse(JSON.stringify(getId))
      return item[0]
    }
    const getAllTracks = async () =>{
      return await search("Tracks") 
      .then(response => {
        console.log(response,'questa è response di GETTALLTRACKS')
        Tracks.value = response     
      })
      .catch((error) => {
        throw error;
      })
    }
  return {
    Tracks,
    Track,
    numberOfTracks,
    createTrack,
    deleteTrack,
    updateTrack,
    getTrack,
    getAllTracks
  }
});

