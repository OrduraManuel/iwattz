<script setup>


import { search, remove } from "@/api/crud";
import { watchEffect, ref, onMounted } from "vue";

import modalEdit from "@/components/auth/modalEdit.vue";

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
// function

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
<table class="table table-border"    >
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Author</th>
      <th scope="col">Title</th>
      <th scope="col">isFav</th>
      <th scope="col">Place</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="book in books" :key="book.id">
      <td scope="row">{{book.number}}</td>
      <td class="td">{{book.author}}</td>
      <td class="td">{{book.title}}</td>
      <td class="td">{{book.isFav}}</td>
      <template v-for="place in places" :key="place.id">        
        <td v-if="book.local == place.id">
          <p class="td">
            {{place.local}}
          </p>
        </td>
      </template><!--:data-bs-target="'#modalEdit' + book.id" @click="selectedBook(book)-->
      <td class="btn btn-success"><router-link :to="{ name:'TrackDetails', params: {id: book.id}}"> edit</router-link></td>
      <td class="btn btn-success"  data-bs-toggle="modal" data-bs-target="#modalEdit" @click="selectedBook(book) ">edit in modal</td>
      <td class="btn btn-danger" @click="deleteHandler(book.id)">delete</td>
    </tr>
  </tbody>
  <modalEdit :thisBook="sel" v-if="sel"/>
</table>    

</template>

<style lang="scss" scoped>

.table-border{
    border: 2px solid white;
    color: white;
}


</style>