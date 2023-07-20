<script setup >
import { ref, watchEffect, onMounted,onUnmounted } from 'vue'

import { remove, update, search } from "@/api/crud";

let props = defineProps({
    thisBook: Object
    })

let thisBook = ref(props.thisBook)
//let books = ref()
let places = ref([])
onMounted(()=>{

  watchEffect( () =>{
    thisBook = ref(null)
    })
})
onUnmounted(()=>{
    thisBook.value = null
    props.thisBook = null
})

async function  searchHandler() {
    places.value = await search("places");
}
   
    const newNumber = ref('')    
    const newTitle = ref('')
    const newAuthor = ref('')
    const newIsFav = ref('')
    const newIsRead = ref('')
    const newLocal = ref('')
    const newNotes = ref('')

const editBook = ref({
    number: newNumber.value,
    title: newTitle.value,
    author: newAuthor.value,
    isFav: newIsFav.value,
    isRead: newIsRead.value,
    local: newLocal.value,
    notes: newNotes.value,
    
})


// update = (collectionRef, id, item)

async function updateHandler(){
    update('Books',thisBook.id, editBook.value)
    console.log(thisBook.id,  'penso sia andata bene...spero!', editBook.value)
}
async function deleteHandler(id) {
    remove("books", id);    
}

</script>
<template v-if="thisBook">
<Teleport to="Body">
    <div class="modal fade" id="modalEdit" tabindex="-1" aria-labelledby="modalEditLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEditLabel">{{thisBook.title}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="containerFirst">
                        <div class="label">
                        <label for="title">Book ID:</label>
                        <input type="text" name="bumber" v-model="newNumber"  :placeholder="thisBook.number" required>
                        <label for="title">Book title:</label>
                        <input type="text" name="title" v-model="newTitle"  :placeholder="thisBook.title" required>
                        <label for="title py-3">Book author:</label>
                        <input type="text" name="author" v-model="newAuthor" :placeholder="thisBook.author" required>
                        </div>
                    </div>
                    <div class="containerSecond my-4">
                        <div class="label">
                            <label for="title">Where is?</label>
                            <select v-model="newLocal" id="isPlace">
                            <option disabled value="">thisBook.local</option>
                            <option v-for="place in places" :value="place.id" :key="place.id">
                                {{place.local}}
                            </option>  
                            </select>
                            <label for="title">Get notes?</label>
                            <textarea rows="" cols="40" name="notes" v-model="newNotes" :placeholder="thisBook.notes">
                            </textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <div class="action">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"  @click="deleteHandler(thisBook.id)">Delete</button>
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="updateHandler">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Teleport>
</template>
<style lang="scss" scoped>
.modal-footer{
    display: flex;
    justify-content: space-between;
    .action{
        display: flex;
        justify-content: end;
    }

}
</style>