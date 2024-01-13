<script setup>
import { watchEffect, ref, onMounted } from 'vue';

import toBack from '@/components/toBack.vue'
import ModalContactMe from '@/components/modal/modalContact.vue'
import ModalBtn from '@/components/modal/btnModal.vue'
import trackPlayer from '@/components/track/trackPlayer.vue'
import AuthorCard from '@/components/author/authorCard.vue'


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
    console.log(selectedTrack.value.Author,'ID AUTHOR DI SELECTEDTRACK')
}

//const router = useRouter()
</script>
<template>
    <div id="selected" v-if="selectedTrack">
            <toBack  where="/selections"/>
            <div class="row content">
                <div class="col-12 col-md-6">
                    <AuthorCard :thisTrack="selectedTrack"></AuthorCard>
                </div>
                <div class="col-12 col-md-4">
                    <trackPlayer :song="selectedTrack" />
                </div>
            </div>
            <ModalBtn :where="'ModalContact'"/>

        <ModalContactMe  />
    </div>
</template>
<style lang="scss" scoped>
#selected{
    //position: relative;
    .content{
        display: flex;
        justify-content: space-around;
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
@media only screen and (max-width: 576px) {
    #selected{
        align-content: start;
        align-items: start;
          .content {
            flex-direction: column-reverse;
            .wrapper{
                align-content: start;
                align-items: start;
                min-height: 70dvh;
                .player-controls{
                    position: absolute;
                    bottom: -35%;
                }
            }
          }
        }
    }
</style>