<script setup>
import toBack from '@/components/toBack.vue';

import { watchEffect, ref, onMounted } from 'vue';

// firebase imports
import { storage } from '@/api/config';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useTrackStore } from '@/store'
import { storeToRefs } from 'pinia';

import getUser from '@/auth/getUser';

import { useRouter } from "vue-router";

const router = useRouter();
const currentUser = getUser;

const TrackStore = useTrackStore()
const { Tracks } = storeToRefs(TrackStore)
//const { Track } = storeToRefs(TrackStore)
//const newTrack = computed(() => Track.value);

const Track = ref({
      Number: '',
      Organizer: {
        id: '666',
      },
      Author: '',
      Title: '',
      isFav: '',
      Src: '',
      Img: {
        Name: '',
        Path: null
      },
    })

onMounted(()=>{
	watchEffect( () =>{
		TracksNumber.value = null;
		searchHandler();
	});
});

let TracksNumber = ref();


// function search
async function  searchHandler() {
	TracksNumber.value = await TrackStore.numberOfTracks();
	TracksNumber.value++;
  Track.value.Number = TracksNumber.value
}

let uploader;
let uploaded = ref()

// function pick your file
function uploadStart(){
	uploader.click();
}
function previewImage(event){
	uploaded.value = event.target.files[0];
  console.log(uploaded.value,'in previewImage')
  if(uploaded != null){
    let almostLoad = ref('');
    almostLoad.value = 'Hai selezionato: ' + uploaded.value.name + ' come Img!';
    let loaded = document.getElementById('almostLoad');
    loaded.classList.remove('d-none');
    loaded.innerHTML = almostLoad.value;
  }else{
    console.log('uploaded è null')
  }
}

function uploadFile(file){
  console.log('uploadFile here')
  console.log(file,'zzzzzzzzthis is el in uploadFile')
  Track.value.Img.Name = file.name
  const storageRefs = storageRef(storage,'images/'+file.name);
  const metadata = {
    contentType: file.type
  };
  const uploadTask = uploadBytesResumable(storageRefs, file);

    uploadTask.on(
    'state_changed',
    (snapshot) =>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
    },
    (error) =>{
      console.log( 'questo è l errore: ',error )
    },
    async () =>{
      console.log('questo è lo snapshot ref: ', uploadTask.snapshot.ref)
      await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
        console.log('questo è url: ', downloadURL)
      })
    }  
  )
}


// function create
const handleSubmit = async () => {
    await uploadFile(uploaded.value)
    TrackStore.createTrack(Track.value)
      .then(()=>{
          Track.value.Number ='';
          Track.value.Title = '';
          Track.value.Author = '';
          Track.value.Img = '';
          Track.value.Src = '';
          Track.value.isFav = false;
          router.push('/dashboard');  
      })
      .catch(error => {
          router.push({
            name: '404Resource',
            params: { resource: error }
          })
        })
    }
</script>
<template>
    <div id="create" v-if="Track">
      <div class="container-fluid">
        <toBack where="/Dashboard"/>
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="handleSubmit" class="createTrackForm">
              <div class="containerFirst">
                <div class="label">
                  <label for="title">Track title:</label>
                  <input type="text" name="title" v-model="Track.Title"  placeholder="Inserisci il titolo del libro"  required>
                  <label for="title py-3">Track author:</label>
                  <input type="text" name="author" v-model="Track.Author" placeholder="Inserisci l'autore del libro"  required>
                </div>
                <div class="checkLove" :class="{cta: !isFav, ctaLove: isFav}">
                  <span class="mb-2">Did you love this Track?</span>
                  <i :class="{icon: true, fas: isFav, far: !isFav }" class="fa-heart fa-2x my-auto" ></i>
                  <input type="checkbox" id="checkLove" class=" mt-3" v-model="Track.isFav" value="true"/>
                  <label for="checkLove">checkLove</label>
                </div>
              </div>
              <div class="containerSecond my-4">
                  <div class="label">
                    <label for="title">Get Src?</label>
                    <textarea rows="" cols="40" name="notes" v-model="Track.Src" >
                    </textarea>
                  </div>
                <div class="ImgImage">
                  <span class="mb-2">Upload this Img</span>
                  <button class="btn btn-primary" 
                    @click="uploadStart">Choose your Img
                  </button>
                  <input style="display:none" 
                  type="file" id="uploader" class="mt-3" 
                  ref="uploader" @change="previewImage" accept="image/*"/>
                  <div id="almostLoad" class="d-none">burp</div>
                </div>        
              </div>
              <button>Add Track</button>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped>
#almostLoad{
  font-size: 20px;
  padding: 20px;
  color: white;
  background: purple;
}
</style>