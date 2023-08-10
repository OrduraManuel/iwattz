import { defineStore } from 'pinia';
//import axios from 'axios';
import { ref, watch } from 'vue';

import { create, search, remove, update, get } from "@/api/crud";

export const useTrackStore = defineStore('trackStore', () => {

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
      })
      .catch(error =>{
        throw error;
      }); 
    }
    const deleteTrack = async (thisTrack) =>{
      return await remove('Tracks', thisTrack)
      .then(() =>{
        const updateTracks = Tracks.value.filter((x) => {
          return x.thisTrack !== thisTrack
        })
        Tracks.value = updateTracks
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
        console.log('lintero tracks: ',Tracks.value)
      })
      .catch((error) => {
        console.log(error,'errror in UpdateTracks')
        throw error;
      })
    }
    const getTrack = async (id) =>{
      const getId = await Tracks.value.filter((x) => {
        return x.id === id 
      })
      let item = JSON.parse(JSON.stringify(getId))
      console.log(item[0],'this is stringiuahsda')
      return item[0]
    }
    const getAllTracks = async () =>{
      return await search("Tracks") 
      .then(response => {
        Tracks.value = response     
      })
      .catch((error) => {
        console.log(error,'errror in getAllTracks')
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

