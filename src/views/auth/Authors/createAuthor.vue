<script setup>
import toBack from '@/components/toBack.vue';

import { watchEffect, ref, onMounted } from 'vue';

// firebase imports

import { storage } from '@/api/config';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useAuthorStore } from '@/store'
import { storeToRefs } from 'pinia';

import getUser from '@/auth/getUser';

import { useRouter } from "vue-router";

const router = useRouter();
const currentUser = getUser;

const AuthorStore = useAuthorStore()
const { Authors } = storeToRefs(AuthorStore)
//const { Author } = storeToRefs(AuthorStore)
//const newAuthor = computed(() => Author.value);

const SrcOptions = [
  'Rock','Pop','Rap', 'Raggae', 'Metal'
]

const Author = ref({
  Number: '',
  Organizer: {
    id: '666',
  },
  Name: '',
  Category: [],
  Descr: '',
  Members: [],
  Songs: [],
  Img: {
    Name: '',
    Path: null
  },
})

onMounted(() => {
  watchEffect(() => {
    AuthorsNumber.value = null;
    searchHandler();
  });
});

let AuthorsNumber = ref();


// function search
async function searchHandler() {
  AuthorsNumber.value = await AuthorStore.numberOfAuthors();
  AuthorsNumber.value++;
  Author.value.Number = AuthorsNumber.value
}

let uploader;
let uploaded = ref()

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
    let loaded = document.getElementById('almostLoad');
    loaded.classList.remove('d-none');
    loaded.innerHTML = almostLoad.value;
  } else {
    console.log('uploaded è null')
  }
}

async function uploadFile(file) {
  console.log('uploadFile here');
  console.log(file, 'zzzzzzzzthis is el in uploadFile');

  Author.value.Img.Name = file.name;
  const storagePath = `${Author.value.Name}/${file.name}`;
  const storageRefs = storageRef(storage, storagePath);
  const metadata = {
    contentType: file.type
  };
  const uploadTask = uploadBytesResumable(storageRefs, file, metadata);

  return await new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log('questo è l errore: ', error);
        reject(error);
      },
      async () => {
        console.log('questo è lo snapshot ref: ', uploadTask.snapshot.ref);
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        Author.value.Img.Path = downloadURL;
        resolve(downloadURL);
      }
    )
  });
}

// function create
const handleSubmit = async () => {
  try {
    const downloadURL = await uploadFile(uploaded.value);
    if (downloadURL) {
      await createAuthor(downloadURL);
      resetAuthor();
      router.push('/dashboard');
    }
  } catch (error) {
    router.push({
      name: '404Resource',
      params: { resource: error }
    });
  }
};

const createAuthor = async (downloadURL) => {
  Author.value.Img.Path = downloadURL;
  await AuthorStore.createAuthor(Author.value);
};

const resetAuthor = () => {
  Author.value = {
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
  <div id="create" v-if="Author">
    <div class="container-fluid">
      <toBack where="/Dashboard" />
      <div class="row">
        <div class="col-12">
          <form  action="#" @submit.prevent class="createAuthorForm">
            <div class="containerFirst">
              <div class="label">
                <label for="title">Author name:</label>
                <input type="text" name="name" v-model="Author.Name" placeholder="Inserisci il nome dell autore"
                  required>
                <label for="title py-3">Author description:</label>
                <input type="text" name="author" v-model="Author.Descr" placeholder="Inserisci una descrizione"
                  required>
              </div>
            </div>
            <div class="containerSecond my-4">
              <div class="label">
                <label for="title">Get Src?</label>
                <label for="srcSelection">Select website</label>

                <div class="gridWrapper">
                  <label :for="SrcOption" class="radioCard" v-for="SrcOption in SrcOptions" :key="SrcOption">
                    <input type="radio" v-model="Author.Category" :id="SrcOption" :value="SrcOption"/>
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
                <textarea rows="" cols="40" name="notes" v-model="Author.Descr" placeholder="Inserisci una descrizione dell autore">
                </textarea>
              </div>
              <div class="ImgImage">
                <span class="mb-2">Upload this Img</span>
                <button class="btn btn-primary" @click="uploadStart">Choose your Img
                </button>
                <input style="display:none" type="file" id="uploader" class="mt-3" ref="uploader" @change="previewImage"
                  accept="image/*" />
                <div id="almostLoad" class="d-none">burp</div>
              </div>
            </div>
            <button @click="handleSubmit">Add Author</button>
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


</style> 