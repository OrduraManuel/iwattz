<script setup>
import { watchEffect, ref, onMounted } from 'vue';

import toBack from '@/components/toBack.vue'
import ModalContactMe from '@/components/modal/ModalContact.vue'
import ModalBtn from '@/components/modal/BtnModal.vue'
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
    <div id="selected">
        <div class="row" v-if="selectedTrack">
            <toBack  where="/selections"/>
            <div class="content">
                <div class="col-12 col-md-8">
                    <p>questa è la selezionata: {{ selectedTrack }}</p>
                </div>
                <div class="col-12 col-md-4">
                    <trackPlayer :song="selectedTrack" />
                </div>
            </div>
            <ModalBtn />
        </div>
        <ModalContactMe />
    </div>
</template>
<style lang="scss" scoped>
#selected{
    position: relative;
    .content{
        display: flex;
        align-items: center;
    }
}
.selectedTrack{
    h1{
        color: white;
    }
    p{
        color: white;
    }
}
</style>