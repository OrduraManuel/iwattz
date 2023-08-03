import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTrackStore = defineStore('trackStore', () =>{
  const tracks = ref([])
  const track = ref({})

  const numberOfItems = () => {
    return tracks.length
  }

  return {
    tracks,
    track,
    numberOfItems,
  }
});

