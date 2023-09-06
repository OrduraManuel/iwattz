<script setup >
//import { update, get } from "@/api/crud";
import { watchEffect, ref, reactive, onMounted, inject } from "vue";
import toBack from '@/components/toBack.vue'
import { useRouter } from 'vue-router'

import { storage } from '@/api/config';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useTrackStore, useAuthorStore } from '@/store'
import { storeToRefs } from 'pinia';

const TrackStore = useTrackStore()
const AuthorStore = useAuthorStore()
const { Authors } = storeToRefs(AuthorStore)



//props ID passata 
const props = defineProps({
  id: { type: Object, required: true},
})

//On mounted faccio andare SearchHandler che popola thisTrack con l'id della Props
onMounted(()=>{
    thisTrack.value = null
    //SrcOptions = null
  searchHandler()
  //findAuthor()
})

const thisTrack = ref({});

const router = useRouter()

const SrcOptions = ref([
  'spotify','tidal','youtube'
])

let uploaderMp3 = ref() //btn
let uploadedMp3 = ref() //img
let loadedMp3 = ref() //?
let thisTrackMp3 = ref()
let mp3Preview = ref()

let uploaderImg = ref()
let uploadedImg = ref()
let loadedImg = ref()
let imgPreview = ref()

let uploadPath = ref()

let progressBar = ref()
let progress = ref()
let progressNumber = ref()
const AuthorsList = ref()
const AuthorName = ref()

// function get thisTrack
async function  searchHandler() {
    thisTrack.value = await TrackStore.getTrack(props.id)//get('Tracks', props.id);
    await AuthorStore.getAllAuthors('Number')
    AuthorsList.value = Authors.value
    Authors.value.forEach(async Author =>{
        if(Author.id == thisTrack.value.Author){
            AuthorName.value = await Author.Name
            console.log(AuthorName.value,'questo è AUTHOR NAMEEEEE')
        }
    })
}

// function delete thisTrack
function deleteHandler(id) {
    TrackStore.deleteTrack(id)
    router.push('/dashboard');
}

async function updateHandler(id, updateTrack) {
    if(uploadedImg.value != null || undefined){
        await uploadFile(uploadedImg.value)
    }
    if(uploadedMp3.value != null || undefined){
        await uploadFile(uploadedMp3.value)
    }    
    TrackStore.updateTrack(id, updateTrack)
    .then(() =>{
        console.log(thisTrack.value,'dovrebbe esserci l src')
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

// function pick your Img
function uploadStartImg() {
  uploaderImg.value.click();
}
// function pick your Mp3
function uploadStartMp3() {
  uploaderMp3.value.click();
}

function previewImage(event) {
  uploadedImg.value = event.target.files[0];
  if (uploadedImg != null) {
    let almostImg = ref('');
    almostImg.value = 'Hai selezionato: ' + uploadedImg.value.name + ' come Img!';
    loadedImg.value.classList.remove('d-none');

    loadedImg.value.innerHTML = almostImg.value;
    
    var reader = new FileReader();
    reader.onload = function(){
        imgPreview.value.src = reader.result;
        console.log(reader.result, 'this is render result')
    };
    reader.readAsDataURL(uploadedImg.value);
  }
}
function previewMp3(event) {
  uploadedMp3.value = event.target.files[0];
  console.log(uploadedMp3.value,'questo è il file audio')
  if (uploadedMp3 != null) {
    let reader = new FileReader();
    reader.readAsDataURL(uploadedMp3.value);
    reader.addEventListener('load', function(){
        mp3Preview.value.src = reader.result
    })
    let almostMp3 = ref('');
    mp3Preview.value.classList.remove('d-none');
    console.log(thisTrackMp3.value,'perchè non ti metti d-none')
    thisTrackMp3.value.classList.add('d-none')
    console.log(thisTrackMp3.value,'ha messo il d-none')
    almostMp3.value = 'Hai selezionato: ' + uploadedMp3.value.name + ' come Mp3!';
    loadedMp3.value.classList.remove('d-none');
    loadedMp3.value.innerHTML = almostMp3.value;

  } else {
    console.log('uploaded è null')
  }
}

async function uploadFile(file) {

  function renamePath(myName){
    const withoutSpace = myName.split(' ').join('-')
    uploadPath.value =  withoutSpace.split(`'`).join('-')
    console.log(uploadPath.value,'questo è UPLOAD PATHHHHHHHHH')
}
await renamePath(AuthorName.value)


const storagePath = `${uploadPath.value}/${file.name}`;
  const storageRefs = storageRef(storage, storagePath);
  const metadata = {
    contentType: file.type
  };
  if(file.type == 'image/jpeg'){
    thisTrack.value.Img.Name = file.name;
    console.log('image')
  }
  const uploadTask = uploadBytesResumable(storageRefs, file, metadata);

  return await new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const interpolation = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress.value.style.width = interpolation + '%'
        if(file.type == 'image/jpeg'){
            progressNumber.value.innerHTML = 'caricamento cover: '+ interpolation + '%'
        }
        if(file.type == 'audio/mpeg'){
            progressNumber.value.innerHTML = 'caricamento audio: '+ interpolation + '%'
        }
        //progressNumber.value.innerHTML = interpolation + '%'
      },
      (error) => {
        console.log('questo è l errore: ', error);
        reject(error);
      },
      async () => {
        console.log('questo è lo snapshot ref: ', uploadTask.snapshot.ref);
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        if(file.type == 'image/jpeg'){
            thisTrack.value.Img.Path = downloadURL;
          console.log('image')
        }
        if(file.type == 'audio/mpeg'){
            thisTrack.value.Src.Song = downloadURL;
          console.log('image')
        }
        resolve(downloadURL);
      }
    )
  });
}

</script>
<template>
    <div class="editTrack" v-if="thisTrack">
        <div class="container-fluid">
            <div ref="progressBar" class="progressBar">
                <div ref="progress" class="progress"><span ref="progressNumber">666</span></div>
            </div>
            <toBack  where="/dashboard"/>
            <div class="row editHeader">
                <div class="col-6 ">
                    <p>Stai modificando: </p>
                    <div class="label">
                        <h4>{{thisTrack.Title}}</h4>
                    </div>
                </div>
                <div class="col-6">

                </div>
            </div>
            <div class="row editBody">
                <div class="col-4 title squareHole">
                    <div class="label">
                        <label for="title">Track Title:</label>
                        <input type="text" name="title" v-model="thisTrack.Title"  :placeholder="thisTrack.Title"  required> <!--v-model="newAuthor" :placeholder="props.thisTrack.Author" -->
                    </div>
                </div>
                <div class="col-4 author squareHole" style="overflow:scroll">       
                    <div class="label">
                        <label for="title">Track Author:</label>
                        <div class="gridWrapper">
                            <label :for="Author" class="radioCard" v-for="AuthorList in AuthorsList" :key="AuthorList.Number">
                                <input type="radio" v-model="thisTrack.Author" :id="AuthorList" :value="AuthorList.id" required/>
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
                </div>
                <div class="col-4 number ">
                    <div class="label squareHole">
                        <label for="title">La sua posizione:</label>
                        <input type="number" name="number" v-model="thisTrack.Number" :placeholder="thisTrack.Number" required> <!-- v-model="newNumber" :placeholder="props.thisTrack.Number" -->
                    </div>
                </div>
                <div class="col-4 link squareHole">
                    <div class="label">
                        <label for="title">Da dove proviene il link:</label>
                        <div class="gridWrapper" >
                            <label class="radioCard" v-for="SrcOption in SrcOptions" :key="SrcOption">
                                <input type="radio" 
                                :id="SrcOption" 
                                :value="SrcOption"
                                v-model="thisTrack.Src.Option"
                                v-if="thisTrack.Src?.Option"
                                />
                                <div class="cardContentWrapper">
                                <span class="checkIcon">
                                    
                                </span>
                                <div class="cardContent">
                                    <!--<p>v-model="thisTrack.Src.Option"</p>-->
                                    <h4>{{ SrcOption}}</h4>
                                </div>
                                </div>
                                
                            </label>
                        </div>                    
                    </div>
                    <div class="label">
                        <label for="title">Get link:</label>
                        <input type="text" v-model="thisTrack.Src.Href"  name="src" :placeholder="thisTrack.Src?.Href" required v-if="thisTrack.Src?.Href">
                    </div>
                </div>                
                <div class="col-4 img squareHole">
                    <div class="label">
                        <label for="title">Get Image:</label>
                        <div class="imageContainer">
                            <button class="btn btn-primary" @click="uploadStartImg">Pick your new Img</button>

                            <img :src="thisTrack.Img?.Path" ref="imgPreview" class="imgPreview"/>
                            <input type="file" 
                            style="display:none" id="uploaderImg" class="mt-3" 
                            ref="uploaderImg" @change="previewImage"
                            accept="image/*" />
                            <div  ref="loadedImg" class="d-none">burp</div>
                        </div>
                    </div>
                </div>
                <div class="col-4 mp3 squareHole">
                    <div class="label">
                        <label for="title">Get Mp3:</label>
                        <div class="mp3Container">
                            <button class="btn btn-primary" @click="uploadStartMp3">Pick your new Mp3</button>
                            <audio controls class=""  :src="thisTrack.Src?.Song" ref="thisTrackMp3" v-if="thisTrack.Src?.Song"></audio>
                            <audio controls class="d-none"  ref="mp3Preview"></audio>
                            <input type="file" 
                            style="display:none" id="uploaderMp3" class="mt-3" 
                            ref="uploaderMp3" @change="previewMp3"
                            accept="audio/*" />
                            <div  ref="loadedMp3" class="d-none">burp</div>
                        </div>
                    </div>
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
    <style lang="scss" scoped>


.editTrack{
    .editHeader{
        p{
            margin-bottom: -1%;
            opacity: .6;
            font-style: italic;
        }
        .label{
            h4{
                color: var(--textLight);
            }
            input{
                border-radius: var(--radiusS);
                max-width: 2.5rem;
                margin-top: .3rem;
            }
        }

    }
    .editBody{
        .label{
            display: flex;
            flex-direction: column;
            label{
                margin-bottom: -1%;
                opacity: .6;
                font-style: italic;
            }
            input{
                border-radius: var(--radiusS);
                //max-width: 2.5rem;
                margin-top: .3rem;
            }
        }
        .number{
            display:flex;
            justify-content: flex-end;
                input{
                //border-radius: var(--radiusS);
                max-width: 2.5rem!important;
                //margin-top: .3rem;
                }
            }
        .link{
margin-top: calc(var(--borderSize) - var(--borderSize)  - var(--borderSize));
        }
        .img{
            margin-top: calc(var(--borderSize) - var(--borderSize)  - var(--borderSize));
            .imageContainer {
                display:flex;
                justify-content: space-between;
                .imgPreview{
                    width: 7rem;
                }
            }


        }
        .squareHole{
            border: var(--border);
            padding: 1rem;
            transition: .5s all ease-in-out;
            
            &:hover{
                transform: translateY(-6.66%);
                transition: .2s all ease-in-out;
                backdrop-filter: blur(10px);
                background: rgba(255,255,255,.2);
            }
        }
    }
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