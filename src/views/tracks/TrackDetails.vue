<script setup >
import { update, remove, get } from "@/api/crud";
import { watchEffect, ref, onMounted } from "vue";
import toBack from '@/components/toBack.vue'
import { useRouter } from 'vue-router'


//props ID passata 
const props = defineProps({
  id: { type: Object, required: true},
})

//On mounted faccio andare SearchHandler che popola thisTrack con l'id della Props
onMounted(()=>{
  searchHandler()

})

const thisTrack = ref();

const router = useRouter()

const editTrack = ref({
    Number: thisTrack.Number,
    Title: thisTrack.Title,
    Author: thisTrack.Author,
    //isFav: thisTrack.IsFav,
    //Img: Img.value,
    Src: thisTrack.Src,
    //userUid: user.value.uid
})

// function get thisTrack
async function  searchHandler() {
    thisTrack.value = await get('Tracks', props.id);
}
// function delete thisTrack
function deleteHandler(id) {
	remove('Tracks', id);
  router.push('/dashboard');
}

async function updateHandler(colRef, id, updateTrack ) {
    update(colRef, id, updateTrack);
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
                            <input type="number" name="number" v-model="editTrack.Number" :placeholder="thisTrack.Number" required> <!-- v-model="newNumber" :placeholder="props.thisTrack.Number" -->
                            <label for="title py-3">Track author:</label>
                            <input type="text" name="author" v-model="editTrack.Author"  :placeholder="thisTrack.Author"  required> <!--v-model="newAuthor" :placeholder="props.thisTrack.Author" -->

                            <label for="title">Get Link?</label>
                            <input type="text" v-model="editTrack.Src"  name="src" :placeholder="thisTrack.Src" required>

                </div>
                <div class="col-6 d-flex" style="flex-direction: column;">
                    <label for="title">Track title:</label>
                    <input type="text" name="title" v-model="editTrack.Title"  :placeholder="thisTrack.Title" required> <!-- v-model="newTitle"  :placeholder="props.thisTrack.Title" -->
                    <label for="title">It image?</label>
                </div>
                <div class="col-12 my-5">
                    <div class="btnContainer d-flex justify-content-center">
                        <button type="button" class="btn btn-danger mx-5 "  @click="deleteHandler(props.id)" >Delete</button>
                        <button type="button" class="btn btn-primary mx-5 " @click="updateHandler('Tracks', props.id, editTrack )">Save changes</button> <!-- @click="handleEdit" -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    