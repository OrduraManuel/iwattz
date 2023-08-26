<script setup >
//import { update, get } from "@/api/crud";
import { watchEffect, ref, reactive, onMounted, inject } from "vue";
import toBack from '@/components/toBack.vue'
import { useRouter } from 'vue-router'

import { storage } from '@/api/config';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useTrackStore } from '@/store'
const TrackStore = useTrackStore()

//props ID passata 
const props = defineProps({
  id: { type: Object, required: true},
})

//On mounted faccio andare SearchHandler che popola thisTrack con l'id della Props
onMounted(()=>{
    thisTrack.value = null
    //SrcOptions = null
  searchHandler()
})

const thisTrack = ref({});

const router = useRouter()

const SrcOptions = ref([
  'spotify','tidal','youtube'
])
let uploader;
let loaded = ref()
let imgPreview = ref()
let uploaded = ref()
let progressBar = ref()
let progress = ref()
let progressNumber = ref()

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
    await uploadFile(uploaded.value)
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

// function pick your file
function uploadStart() {
  uploader.click();
}

function previewImage(event) {
  uploaded.value = event.target.files[0];
  console.log(uploaded.value, 'in previewImage')
  if (uploaded != null) {
    let almostLoad = ref('');
    almostLoad.value = 'Hai selezionato: ' + uploaded.value.name + ' come Img!';
    loaded.value.classList.remove('d-none');
    loaded.value.innerHTML = almostLoad.value;
    
    var reader = new FileReader();
    reader.onload = function(){
        imgPreview.value.src = reader.result;
        console.log(reader.result, 'this is render result')
    };
    reader.readAsDataURL(uploaded.value);
  }
}


async function uploadFile(file) {
  thisTrack.value.Img.Name = file.name;
  const storagePath = `images/${file.name}`;
  const storageRefs = storageRef(storage, storagePath);
  const metadata = {
    contentType: file.type
  };
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
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        thisTrack.value.Img.Path = downloadURL;
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
                <div class="col-4 author squareHole">       
                    <div class="label">
                        <label for="title">Track Author:</label>
                        <input type="text" name="author" v-model="thisTrack.Author"  :placeholder="thisTrack.Author"  required> <!--v-model="newAuthor" :placeholder="props.thisTrack.Author" -->
                    </div>
                </div>
                <div class="col-4 number ">
                    <div class="label squareHole">
                        <label for="title">La sua posizione:</label>
                        <input type="number" name="number" v-model="thisTrack.Number" :placeholder="thisTrack.Number" required> <!-- v-model="newNumber" :placeholder="props.thisTrack.Number" -->
                    </div>
                </div>
                <div class="col-6 link squareHole">
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
                <div class="col-6 img squareHole">
                    <div class="label">
                        <label for="title">Get Image:</label>
                        <div class="imageContainer">
                            <button class="btn btn-primary" @click="uploadStart">Pick your new Img</button>

                            <img :src="thisTrack.Img?.Path" ref="imgPreview" class="imgPreview"/>
                            <input type="file" 
                            style="display:none" 
                            id="uploader" class="mt-3" ref="uploader" @change="previewImage"
                            accept="image/*" />
                            <div  ref="loaded" class="d-none">burp</div>
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