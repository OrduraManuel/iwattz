<script setup>
import toBack from '@/components/toBack.vue';

import { watchEffect, ref, onMounted } from 'vue';

// firebase imports
import { storage } from '@/api/config';
//import getCollection from '@/api/getCollection';
import { search, create } from '@/api/crud';
import getUser from '@/auth/getUser';
import { ref as storageRef, uploadBytesResumable } from 'firebase/storage';
//import { addDoc, collection} from 'firebase/firestore';



onMounted(()=>{
	watchEffect( () =>{
		Tracks.value = null;
		searchHandler();
	});
});


let uploader;
let Tracks = ref([]);
let TrackNumber = ref();

const { user } = getUser();
const Number = ref('');
const Title = ref('');
const Author = ref('');
const isFav = ref('');
const Src = ref('');
const Img = ref({
	imageData: null,
	src: null,
});

const storageRefs = ref();


// function pick your file
function uploadStart(){
	uploader.click();
}
function previewImage(event){
	let uploaded = ref({
		imageData: null,
		src: null,
	});
	uploaded.src = null;
	uploaded.imageData = event.target.files[0];
  if(uploaded != null){
    onUploading(uploaded);
  }else{
    console.log('uploaded è null')
  }

}


// function after choose file
async function onUploading(el){

	// Upload file and metadata to the object 'images/mountains.jpg'
	storageRefs.value = await storageRef(storage, 'images/' + el.imageData.name);

  //manage show-up UI after upload
	let almostLoad = ref('');
	almostLoad.value = 'Hai selezionato' + storageRefs.value.name + 'come Img!';
	let loaded = document.getElementById('almostLoad');
	loaded.classList.remove('d-none');
	loaded.innerHTML = almostLoad.value;

	Img.imageData = el.imageData,
	Img.src = storageRefs.value.fullPath
}

// function search
async function  searchHandler() {
	Tracks.value = await search('Tracks');
	TrackNumber.value = await Tracks.value.length;
	TrackNumber.value++;
}

// function create
const handleSubmit = async () => {
	/*uploadBytesResumable(storageRefs, Img.value.imageData, metadata.value.contentType);*/

	await create('Tracks', {
    Number: TrackNumber.value,
    Title: Title.value,
    Author: Author.value,
    isFav: isFav.value,
    Img: Img.value,
    Src: Src.value,
    userUid: user.value.uid
  });
	// reset the form
	Number.value ='';
	Title.value = '';
	Author.value = '';
	Img.value = '';
  Src.value = '';
	isFav.value = false;
}
</script>
<template>
    <div id="create">
      <div class="container-fluid">
        <toBack where="/Dashboard"/>
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="handleSubmit" class="createTrackForm">
              <div class="containerFirst">
                <div class="label">
                  <label for="title">Track title:</label>
                  <input type="text" name="title" v-model="Title"  placeholder="Inserisci il titolo del libro"  required>
                  <label for="title py-3">Track author:</label>
                  <input type="text" name="author" v-model="Author" placeholder="Inserisci l'autore del libro"  required>
                </div>
                <div class="checkLove" :class="{cta: !isFav, ctaLove: isFav}">
                  <span class="mb-2">Did you love this Track?</span>
                  <i :class="{icon: true, fas: isFav, far: !isFav }" class="fa-heart fa-2x my-auto" ></i>
                  <input type="checkbox" id="checkLove" class=" mt-3" v-model="isFav" value="true"/>
                  <label for="checkLove">checkLove</label>
                </div>
              </div>
              <div class="containerSecond my-4">
                  <div class="label">
                    <label for="title">Get Src?</label>
                    <textarea rows="" cols="40" name="notes" v-model="Src" >
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