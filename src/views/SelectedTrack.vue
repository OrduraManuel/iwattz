<script setup>
import { watchEffect, ref, onMounted } from 'vue';

import toBack from '@/components/toBack.vue'
import trackPlayer from '@/components/track/trackPlayer.vue'

import { useRouter } from 'vue-router'

import { useTrackStore } from '@/store'
const TrackStore = useTrackStore()

//props ID passata 
const props = defineProps({
  id: { type: Object, required: true},
})

//On mounted faccio andare SearchHandler che popola selectedTrack con l'id della Props
onMounted(()=>{
    selectedTrack.value = null
    //SrcOptions = null
  searchHandler()
})

const selectedTrack = ref({});

// function get selectedTrack
async function  searchHandler() {
    selectedTrack.value = await TrackStore.getTrack(props.id)//get('Tracks', props.id);
    console.log(selectedTrack.value,'questa è la traccia su cui lavoreremo')
}

//const router = useRouter()
</script>
<template>
    
    <div class="row" v-if="selectedTrack">
        <toBack  where="/selections"/>
            <div class="col-8">
                <p>{{ selectedTrack }}</p>
            </div>
            <div class="col-4">
                <trackPlayer :song="selectedTrack" />
            </div>
        </div>

</template>
<style lang="scss" scoped>
.selectedTrack{
    h1{
        color: white;
    }
    p{
        color: white;
    }
}
</style>