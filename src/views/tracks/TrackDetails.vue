<script setup >
import { search, remove } from "@/api/crud";
import { watchEffect, ref, onMounted } from "vue";

const props = defineProps({
  id: { type: Object, required: true},
})

console.log(props.id,'questo è props.id', props.obj,'questo è props')
const thisTrack = ref(props.id)

let sel = ref()
let books = ref([])
let places = ref([])

onMounted(()=>{
  places.value = null
  books.value = null
  sel.value = null

})
watchEffect( () =>{
      books = ref()
      places = ref()
      sel = ref()

      if(books || places){
        searchHandler();
      }
  })
// function
async function  searchHandler() {
    books.value = await search("books");
    places.value = await search("places");
}

async function deleteHandler(id) {
    remove("books", id);    
}

</script>
<template>
    <div id="trackDetails">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    sono l ' id del libro appena cliccato<span style="font-size: 10px">{{props.id}} </span>
<!--
                    <template v-for="book in books" :key="book.id">        
                        <div v-if="book.id == props.id">
                            <h3 class="title">{{book.title}}</h3>
                            <h6 class="subtitle">{{book.author}}</h6>
                            <p class="id">{{book.id}}</p>
                        </div>
                    </template>-->
                    {{props.obj}}
                </div>

            </div>
        </div>
    </div>

    
    </template>
    