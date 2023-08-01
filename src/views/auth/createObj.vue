<script setup>
import toBack from '@/components/toBack.vue'

import { watchEffect, ref, onMounted } from 'vue'

// firebase imports
import { db, storage } from '@/api/config'
import getCollection from '@/api/getCollection'
import { search, create } from "@/api/crud";
import getUser from '@/auth/getUser'
import { ref as storageRef, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection} from 'firebase/firestore'

let uploader
let books = ref([])
let bookId = ref()
const { documents: places } = getCollection('places')

onMounted(()=>{
    watchEffect( () =>{
          books.value = null
          searchHandler();
        })
})
const { user } = getUser()
const number = ref('')
const title = ref('')
const author = ref('')
const isFav = ref('')
const isRead = ref('')
const local = ref('')
const cover = ref({
  type: null,
  imageData: null,
  src: null,
})
const notes = ref('')




function uploadStart(){
  console.log(uploader,'this is UPLOADER ref, how can i click?')
  uploader.click()
  console.log(cover.value,'this is cover')
}
function previewImage(event){
  let uploaded = ref({
    type: null,
    imageData: null,
    src: null,
  })
  uploaded.type = 0;
  uploaded.src = null;
  uploaded.imageData = event.target.files[0];
  onUploading(uploaded)
}
async function onUploading(el){
  let almostLoad = ref('')
  // Create the file metadata
  const metadata = {
    contentType: storageRef(el.imageData.type)
  };
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRefs = await storageRef(storage, 'images/' + el.imageData.name);
  almostLoad = 'Hai selezionato' + el.imageData.name + 'come cover!'
  console.log(cover.value,'questo è cover PRIMA')
  cover.value.type = metadata,
  cover.value.imageData = el.imageData,
  cover.value.src = storageRefs,
  console.log(storageRefs,'intero',  )
  console.log(cover.value,'questo è cover DOPO')

}

// function
async function  searchHandler() {
    books.value = await search("books");
    bookId.value = await books.value.length
    console.log(bookId.value, 'prima del ++')
    bookId.value++
    console.log(bookId.value, 'dopo del ++')
}

const handleSubmit = async () => {
  const colRef = collection(db, 'books')
  const uploadTask = uploadBytesResumable(storageRefs, cover.imageData, metadata.contentType);
  await addDoc( colRef, {
    number: bookId.value,
    title: title.value,
    author: author.value,
    isFav: isFav.value,
    isRead: isRead.value,
    local: local.value,
    cover: cover.value,
    notes: notes.value,
    userUid: user.value.uid
  })
  // reset the form
  number.value =''
  title.value = ''
  author.value = ''
  local.value = ''
  cover.value = ''
  notes.value = ''
  isFav.value = false
  isRead.value = false
}
</script>
<template>
    <div id="create">
      <div class="container-fluid">
        <toBack where="/Dashboard"/>
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="handleSubmit" class="createBookForm">
              <div class="containerFirst">
                <div class="label">
                  <label for="title">Book title:</label>
                  <input type="text" name="title" v-model="title"  placeholder="Inserisci il titolo del libro" required>
                  <label for="title py-3">Book author:</label>
                  <input type="text" name="author" v-model="author" placeholder="Inserisci l'autore del libro" required>
                </div>
                <div class="checkLove" :class="{cta: !isFav, ctaLove: isFav}">
                  <span class="mb-2">Did you love this book?</span>
                  <i :class="{icon: true, fas: isFav, far: !isFav }" class="fa-heart fa-2x my-auto" ></i>
                  <input type="checkbox" id="checkLove" class=" mt-3" v-model="isFav" value="true"/>
                  <label for="checkLove">checkLove</label>
                </div>
              </div>
              <div class="containerSecond my-4">
                  <div class="label">
                    <label for="title">Where is?</label>
                    <select v-model="local" id="isPlace">
                      <option disabled value="">Seleziona una posizione</option>
                      <option v-for="place in places" :value="place.id" :key="place.id">
                        {{place.local}}
                      </option>  
                    </select>
                    <label for="title">Get notes?</label>
                    <textarea rows="" cols="40" name="notes" v-model="notes">
                    </textarea>
                  </div>
                <div class="coverImage">
                  <span class="mb-2">Upload this cover</span>
                  <button class="btn btn-primary" 
                    @click="uploadStart">Choose your cover
                  </button>
                  <input style="display:none" 
                  type="file" id="uploader" class="mt-3" 
                  ref="uploader" @change="previewImage" accept="image/*"/>
                  <div v-if="cover.imageData != null">
                    <span class="almostLoad"  v-html="almostLoad"></span>
                  </div>
                </div>        
              </div>
              <button>Add Book</button>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped>
.almostLoad{
  font-size: 20px;
  padding: 20px;
  color: white;
  background: purple;
}
</style>