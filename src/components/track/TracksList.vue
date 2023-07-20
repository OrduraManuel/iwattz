<script>
  
import { search, remove, update } from "@/api/crud";
import { watchEffect } from "vue";

// firebase imports

export default {
    data() {
        return {
          books: [],
          };
    },
    computed:{

    },
    methods:{
      async searchHandler() {
        this.books = await search("books");
      },

      async updateHandler(col, id, arg, value){

        if(arg == 'isRead'){
           update( col, id , {isRead : value})
           this.searchHandler();
        }
        if(arg == 'isFav'){
           update( col, id , {isFav : value})
           this.searchHandler();
        }
      },
      async deleteHandler(id) {
        remove("books", id);
        this.searchHandler();
      },
    },  
    created(){
      watchEffect( () =>{
          this.books = null
          this.searchHandler();
        })
    }
}
</script>


<template>
    <transition-group tag="ul" name="slideInUp" class="listBook" appear>
        <li  v-for="book in books" :key="book.id"  >
          <div class="forContent" >
            <router-link :to="{ name:'TrackDetails', params: {id: book.id}}">
              testone
            </router-link>
            <div class="details">
              <h3 @click="deleteHandler(book.id)">{{ book.title }}</h3>
              <p>By {{ book.author }} </p>
            </div>
            <div v-for="place in places" :key="place.id" class=" mx-2">
              <div v-if="book.local == place.id">
                {{place.local}}
              </div>
            </div>
            <div class="toggling">
                <i :class="{icon: true, 
                  'fas': book.isFav, 'far': !book.isFav }" 
                  class="fa-heart my-auto" @click="updateHandler('books', book.id, 'isFav', !book.isFav)" ></i>
              <i :class="{icon: true, 
              'fa-eye': book.isRead, 'fa-eye-slash': !book.isRead }" 
                                                  
              class="far my-auto" @click="updateHandler('books',book.id, 'isRead', !book.isRead)"></i>
            </div>
          </div>
          <div class="notes p-2" v-if="book.notes">
            <span > {{ book.notes }} </span>
          </div> 
        </li>   
    </transition-group> 
  </template>
  

  