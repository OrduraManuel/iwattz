<script setup>
  import { search, remove } from "@/api/crud";
  import { watchEffect, ref, nextTick } from "vue";

  import basicModal from "@/components/auth/basicModal.vue";

  import loader from "@/components/loader.vue";

async function  searchHandler() {
    books.value = await search("books");
    places.value = await search("places");
}

  let sel = ref(null)
  let books = ref([])
  let places = ref([])


function activeModal(thisBook){

  sel.value = thisBook

}

watchEffect( () =>{
      books = ref(null)
      places = ref(null)
      sel = ref(null)
      if(books || places){
        searchHandler();
      }
  })

function deleteHandler(id) {
    remove("books", id);    
}
</script>
<template>
  <div class="table-responsive">
    <table class="  tableDashboard" v-if="books">
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
        <td class="td tdNumber text-truncate">{{book.number}}</td>
        <td class="td text-truncate">{{book.author}}</td>
        <td class="td text-truncate">{{book.title}}</td>
        <td class="td text-truncate">{{book.isFav}}</td>
        <td class="td text-truncate">
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
          <a href="#" 
          class="my-auto btn btn-success" 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal"
          @click="activeModal(book)"> edit in modal</a>
        </td>
        <!--          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" -->
      </tr>
    </tbody>
    </table>    
    <div v-else>
        <loader />  
    </div>
  </div>
  <template>
    <basicModal 
    :thisBook="sel" 
    /> <!-- !== null || sel !== undefined-->

  </template>
    <!--v-if=" sel !== null"-->
</template>