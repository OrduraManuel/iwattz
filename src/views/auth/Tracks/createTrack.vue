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
});

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
  const storagePath = `${Track.value.Author}/${file.name}`;
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
          <form  action="#" @submit.prevent class="createTrackForm">
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
                <input style="display:none" type="file" id="uploader" class="mt-3" ref="uploaderImg" @change="previewImage"
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
            <button @click="handleSubmit">Add Track</button>
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
</style>