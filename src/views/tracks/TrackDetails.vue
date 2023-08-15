<script setup >
//import { update, get } from "@/api/crud";
import { watchEffect, ref, reactive, onMounted, inject } from "vue";
import toBack from '@/components/toBack.vue'
import { useRouter } from 'vue-router'

import { useTrackStore } from '@/store'
const TrackStore = useTrackStore()

//props ID passata 
const props = defineProps({
  id: { type: Object, required: true},
})



//On mounted faccio andare SearchHandler che popola thisTrack con l'id della Props
onMounted(()=>{
    thisTrack.value = null
  searchHandler()
})

const thisTrack = ref({});

const router = useRouter()

// function get thisTrack
async function  searchHandler() {
    thisTrack.value = await TrackStore.getTrack(props.id)//get('Tracks', props.id);
}
// function delete thisTrack
function deleteHandler(id) {
    TrackStore.deleteTrack(id)
    router.push('/dashboard');
}

async function updateHandler(id, updateTrack) {
    //update(colRef, id, updateTrack);
    await TrackStore.updateTrack(id, updateTrack)
    .then(() =>{
        router.push('/dashboard');
    })
    .catch(error => {
          router.push({
            name: '404Resource',
            params: { resource: error }
          })
        })
    searchHandler();
}


</script>
<template>
    <div id="trackDetails" v-if="thisTrack">
        <div class="container-fluid">
            <toBack  where="/dashboard"/>
            <div class="row">
                <div class="col-12">
                    <h2>Stai modificando: {{props.id}} </h2>
                </div>
            </div>
            <div class="row">
                <div class="col-6 d-flex" style="flex-direction: column;">
                            <label for="title">Track ID:</label>
                            <input type="number" name="number" v-model="thisTrack.Number" :placeholder="thisTrack.Number" required> <!-- v-model="newNumber" :placeholder="props.thisTrack.Number" -->
                            <label for="title py-3">Track author:</label>
                            <input type="text" name="author" v-model="thisTrack.Author"  :placeholder="thisTrack.Author"  required> <!--v-model="newAuthor" :placeholder="props.thisTrack.Author" -->

                            <label for="title">Get Link?</label>
                            <input type="text" v-model="thisTrack.Src"  name="src" :placeholder="thisTrack.Src" required>

                </div>
                <div class="col-6 d-flex" style="flex-direction: column;">
                    <label for="title">Track title:</label>
                    <input type="text" name="title" v-model="thisTrack.Title"  :placeholder="thisTrack.Title" required> <!-- v-model="newTitle"  :placeholder="props.thisTrack.Title" -->
                    <label for="title">It image?</label>
                </div>
                <div class="col-12 my-5">
                    <div class="btnContainer d-flex justify-content-center">
                        <button type="button" class="btn btn-danger mx-5 "  @click="deleteHandler(props.id)" >Delete</button>
                        <button type="button" class="btn btn-primary mx-5 " @click="updateHandler(props.id, thisTrack )">Save changes</button> <!-- @click="handleEdit" -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    