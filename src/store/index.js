import { defineStore } from 'pinia'

export const useTrackStore = defineStore( 'trackStore', {
  state() {
    return{
      tracks: [],
      track: {},
    }

  },
  getters: {
    numberOfItems: state => state.tracks.length
  },
  mutations: {
  },
  actions: {

  },
  modules: {},
});

