<script setup>
import { search, remove } from "@/api/crud";
import { watchEffect, ref } from "vue";

import modalEdit from "@/components/auth/modalEdit.vue";
import loader from "@/components/loader.vue";

let sel = ref()
let books = ref([])
let places = ref([])

watchEffect( () =>{
      books = ref(null)
      places = ref(null)
      sel.value = null
      if(books || places){
        searchHandler();
      }
  })

async function selectedBook(book){
  sel.value = null
  sel.value = await book
  console.log(sel.value, 'Questo è l oggetto iniettato')
}

async function  searchHandler() {
    books.value = await search("books");
    places.value = await search("places");
}

async function deleteHandler(id) {
    remove("books", id);    
}

</script>
<template>
  <table class=" tableDashboard" v-if="books">
    <thead>
      <tr class="tableHead">
        <th class="col colNumber">#</th>
        <th class="col">Author</th>
        <th class="col">Title</th>
        <th class="col">isFav</th>
        <th class="col">Place</th>
        <th class="col">Action</th>
        <th class="col"></th>
        <th class="col"></th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book.id">
        <td class="td tdNumber">{{book.number}}</td>
        <td class="td">{{book.author}}</td>
        <td class="td">{{book.title}}</td>
        <td class="td">{{book.isFav}}</td>
        <td class="td">
          <template v-for="place in places" :key="place.id">        
            <div v-if="book.local == place.id">
                {{place.local}}
            </div>
          </template>
        </td>
        <td class="td">
          <router-link class="my-auto btn btn-success" :to="{ name:'TrackDetails', params: {id: book.id}}"> edit</router-link>
        </td>
        <td class="td">
          <a href="#" class="my-auto btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEdit" @click="selectedBook(book)"> edit in modal</a>
        </td>
        <td class="td">
          <a href="#" class="btn my-auto btn-danger" @click="deleteHandler(book.id)"> delete</a>
        </td>
      </tr>
    </tbody>
    <modalEdit :thisBook="sel" v-if="sel"/>
  </table>    
  <div v-else>
      <loader />  
  </div>
</template>