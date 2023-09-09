<script setup>
import toBack from '@/components/toBack.vue';

import { watchEffect, ref, onMounted } from 'vue';

// firebase imports

import { storage } from '@/api/config';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useTrackStore, useAuthorStore } from '@/store'
import { storeToRefs } from 'pinia';

import getUser from '@/auth/getUser';

import { useRouter } from "vue-router";

import { resizeAndSetImage, previewImage } from '@/assets/js/resize.js';

const router = useRouter();
const currentUser = getUser;

const TrackStore = useTrackStore()
const { Tracks } = storeToRefs(TrackStore)
const AuthorStore = useAuthorStore()
const AuthorsList = ref()
const { Authors } = storeToRefs(AuthorStore)

//const { Track } = storeToRefs(TrackStore)
//const newTrack = computed(() => Track.value);

const SrcOptions = [
  'spotify','tidal','youtube'
]

const Track = ref({
  Number: '',
  Organizer: {
    id: '666',
  },
  Author: '',
  Title: '',
  isFav: '',
  Src: {
    Href: '',
    Option: '',
  },
  Img: {
    Name: '',
    Path: null
  },
})

onMounted(() => {
  watchEffect(() => {
    TracksNumber.value = null;
    searchHandler();
  });
  findAuthor()
});

async function findAuthor(){
  //let Arr = Authors.value
  await Authors.value.forEach(Author =>{
    if(Author.id == Track.Author){
      AuthorName.value = Author.Name
      console.log(AuthorName.value,'values')
    }

  })
  console.log(AuthorName.value, 'QUESTOOOOOOOpunto find')
}

let TracksNumber = ref();


// function search
async function searchHandler() {
  await AuthorStore.getAllAuthors('Number')
  AuthorsList.value = Authors.value
  console.log(AuthorsList.value ,'sono gli autori?')
  TracksNumber.value = await TrackStore.numberOfTracks();
  TracksNumber.value++;
  Track.value.Number = TracksNumber.value
}

//let uploader;
let uploaderImg = ref()
let uploadedImg = ref()
let imgPreview = ref()

let uploaderMp3 = ref()
let progressBar = ref()
let progress = ref()
let progressNumber = ref()

// function pick your file
function uploadStartImg() {
  uploaderImg.value.click();
}
function uploadStartMp3() {
  uploaderMp3.value.click();
}

async function pickImage(event) {
  await previewImage(event, uploadedImg, imgPreview); // Chiamata alla funzione importata
    let almostLoad = ref('');
    almostLoad.value = 'Hai selezionato: ' + uploadedImg.value.name + ' come Img!';
    let loaded = document.getElementById('almostLoad');
    loaded.classList.remove('d-none');
    loaded.innerHTML = almostLoad.value;
}

/*
function previewImage(event) {
  uploaderImg.value = event.target.files[0];
  console.log(uploaderImg.value, 'in previewImage')
  if (uploaderImg != null) {
    let almostLoad = ref('');
    almostLoad.value = 'Hai selezionato: ' + uploaderImg.value.name + ' come Img!';
    let loaded = document.getElementById('almostLoad');
    loaded.classList.remove('d-none');
    loaded.innerHTML = almostLoad.value;
  } else {
    console.log('uploaded è null')
  }
}
*/
function previewMp3(event) {
  uploaderMp3.value = event.target.files[0];
  console.log(uploaderMp3.value, 'in previewImage')
  if (uploaderMp3 != null) {
    let almostLoad = ref('');
    almostLoad.value = 'Hai selezionato: ' + uploaderMp3.value.name + ' come Mp3!';
    let loaded = document.getElementById('almostLoad');
    loaded.classList.remove('d-none');
    loaded.innerHTML = almostLoad.value;
  } else {
    console.log('uploaded è null')
  }
}

async function uploadFile(file){

  const uploadPath = ref()

  function renamePath(myName){
    const withoutSpace = myName.split(' ').join('-')
    uploadPath.value =  withoutSpace.split(`'`).join('-')
}
await renamePath(AuthorName.value)

const storagePath = `${uploadPath.value}/${file.name}`;

  const storageRefs = storageRef(storage, storagePath);
  const metadata = {
    contentType: file.type
  };
  if(file.type == 'image/jpeg'){
    Track.value.Img.Name = file.name;
    console.log('image')
  }
  const uploadTask = uploadBytesResumable(storageRefs, file, metadata);

  return await new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const interpolation = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress.value.style.width = interpolation + '%'
        progressNumber.value.innerHTML = interpolation + '%'
      },
      (error) => {
        console.log('questo è l errore: ', error);
        reject(error);
      },
      async () => {
        console.log('questo è lo snapshot ref: ', uploadTask.snapshot.ref);
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        if(file.type == 'image/jpeg'){
          Track.value.Img.Path = downloadURL;
          console.log('image')
        }
        if(file.type == 'audio/mpeg'){
          Track.value.Src.Song = downloadURL;
          console.log('image')
        }
        resolve(downloadURL);
      }
    )
  });
}

// function create
const handleSubmit = async () => {
  try {
    const downloadIMG = await uploadFile(uploaderImg.value);
    const downloadMP3 = await uploadFile(uploaderMp3.value);
    if (downloadIMG && downloadMP3) {
      await createTrack(downloadIMG, downloadMP3);
      resetTrack();
      router.push('/dashboard');
    }
  } catch (error) {
    router.push({
      name: '404Resource',
      params: { resource: error }
    });
  }
};

const createTrack = async (downloadIMG, downloadMP3) => {
  Track.value.Img.Path = downloadIMG;
  Track.value.Src.Song = downloadMP3;
  await TrackStore.createTrack(Track.value);
};

const resetTrack = () => {
  Track.value = {
    Number: '',
    Title: '',
    Author: '',
    Img: '',
    Src: '',
    isFav: false
  };
};


</script>
<template>
  <div id="create" v-if="Track">
    <div class="container-fluid">
      <div ref="progressBar" class="progressBar">
        <div ref="progress" class="progress"><span ref="progressNumber">666</span></div>
      </div>
      <toBack where="/Dashboard" />
      <div class="row">
        <div class="col-12">
          <form  id="createForm" action="#" @submit.prevent class="createTrackForm">
            <div class="containerFirst">
              <div class="label">
                <label for="title">Track title:</label>
                <input type="text" name="title" v-model="Track.Title" placeholder="Inserisci il titolo del libro"
                  required>
                <label for="title py-3">Track author:</label>
                <div class="gridWrapper">
                  <label :for="Author" class="radioCard" v-for="AuthorList in AuthorsList" :key="AuthorList.Number">
                    <input type="radio" v-model="Track.Author" :id="AuthorList" :value="AuthorList.id" required/>
                    <div class="cardContentWrapper">
                      <span class="checkIcon">
                        <!--<i class="fa-brands" :class="'fa-'+SrcOption"></i>-->
                      </span>
                      <div class="cardContent">
                        <h4>{{ AuthorList.Name }}</h4>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div class="checkLove" :class="{ cta: !isFav, ctaLove: isFav }">
                <span class="mb-2">Did you love this Track?</span>
                <i :class="{ icon: true, fas: isFav, far: !isFav }" class="fa-heart fa-2x my-auto"></i>
                <input type="checkbox" id="checkLove" class=" mt-3" v-model="Track.isFav" value="true" />
                <label for="checkLove">checkLove</label>
              </div>
            </div>
            <div class="containerSecond my-4">
              <div class="label">
                <label for="title">Get Src?</label>
                <label for="srcSelection">Select website</label>

                <div class="gridWrapper">
                  <label :for="SrcOption" class="radioCard" v-for="SrcOption in SrcOptions" :key="SrcOption">
                    <input type="radio" v-model="Track.Src.Option" :id="SrcOption" :value="SrcOption"/>
                    <div class="cardContentWrapper">
                      <span class="checkIcon">
                        <!--<i class="fa-brands" :class="'fa-'+SrcOption"></i>-->
                      </span>
                      <div class="cardContent">
                        <h4>{{ SrcOption }}</h4>
                      </div>
                    </div>
                    
                  </label>
                </div>
                <textarea rows="" cols="40" name="notes" v-model="Track.Src.Href">
                    </textarea>
              </div>
              <div class="ImgImage">
                <span class="mb-2">Upload this Img</span>
                <button class="btn btn-primary" @click="uploadStartImg">Choose your Img
                </button>
                <img :src="null" ref="imgPreview" class="imgPreview"/>
                <input style="display:none" type="file" 
                id="uploaderImg" class="mt-3" 
                ref="uploaderImg" @change="pickImage"
                accept="image/*" />
                <div id="almostLoad" class="d-none">burp</div>
              </div>
              <div class="Mp3">
                <span class="mb-2">Upload this Mp3</span>
                <button class="btn btn-primary" @click="uploadStartMp3">Choose your Mp3
                </button>
                <input style="display:none" type="file" id="uploader" class="mt-3" ref="uploaderMp3" @change="previewMp3"
                  accept=".mp3,audio/*" />
                <div id="almostLoad" class="d-none">burp</div>
              </div>
            </div>
            <div class="ctaContainer">
              <a class="createBtn" @click="handleSubmit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Add Author
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
#almostLoad {
  font-size: 20px;
  padding: 20px;
  color: white;
  background: purple;
}
  .imgPreview{
    width: 7rem;
  }
.progressBar{
    position: absolute;
    top:0;
    left: 0;
    width: 100vw;
    height: var(--marginT);
    background: transparent;
    transform: scale(1.02);
    .progress{
        height: 100%;
        background: var(--brandPrimary);
        width: 0%;
        transition: .2s all ease-in-out;
        border-radius: 0;
        transform: skewX(-30deg);
        display:flex;
        justify-content: flex-end;
        align-items: center;
        span{
            font-size: 1.7rem;
            color: var(--textLight);
            margin-right: 1rem;
        }
    }
}

#createForm{
  position: relative;
.ctaContainer{
    position: absolute;
    display: inline-block;
    bottom: calc(var(--marginB) / 2);
    right: calc(var(--marginR) / 2);
    width: 6rem!important;
    height: 6rem!important;
}
a{
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: inline-block;
    padding: 10px 20px;
    color: var(--brandPrimary);
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px;
        &:hover{
            background: var(--brandPrimary);
            color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 5px var(--brandPrimary),
                        0 0 25px var(--brandPrimary),
                        0 0 50px var(--brandPrimary),
                        0 0 100px var(--brandPrimary);
            }
        span{
            position: absolute;
            display: block;
            &:nth-child(1){
                top: 0;
                left: -100%;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, var(--brandPrimary));
                animation: btn-anim1 1s linear infinite;
            }
            &:nth-child(2) {
                top: -100%;
                right: 0;
                width: 2px;
                height: 100%;
                background: linear-gradient(180deg, transparent, var(--brandPrimary));
                animation: btn-anim2 1s linear infinite;
                animation-delay: .25s
            }
            &:nth-child(3) {
                bottom: 0;
                right: -100%;
                width: 100%;
                height: 2px;
                background: linear-gradient(270deg, transparent, var(--brandPrimary));
                animation: btn-anim3 1s linear infinite;
                animation-delay: .5s
            }
            &:nth-child(4) {
                bottom: -100%;
                left: 0;
                width: 2px;
                height: 100%;
                background: linear-gradient(360deg, transparent, var(--brandPrimary));
                animation: btn-anim4 1s linear infinite;
                animation-delay: .75s
                }
        }    
    }
  }  
    @keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}
@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}
@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}
@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}
</style>