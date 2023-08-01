<script setup>
let props = defineProps({
    thisBook: Object,
    })

    import { ref } from 'vue'
    import loader from "@/components/loader.vue";


    //import { search } from "@/api/crud";
/*
    let places = ref([])

    onMounted(() => {
        searchHandler()
    })
    async function  searchHandler() {
            places.value = await search("places");
        }
        */
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

    const emit = defineEmits(['editBook'])

    const handleEdit = () => {
        emit('editBook')
        console.log( emit('editBook'),'handleEdit')
    }
    function closeModal(){
    const myModal = document.getElementById('exampleModal')
    myModal.classList.remove('show', 'd-block')

}

</script>
<template >
    <Teleport to="Body">
        <div class="modal fade" 
        id="exampleModal" 
        tabindex="-1" 
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true" 
        v-if="props.thisBook">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">{{ props.thisBook.title }}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
                <div class="label">
                    <label for="title">Book ID:</label>
                        <input type="text" name="number" v-model="newNumber" :placeholder="props.thisBook.number" required>
                    <label for="title">Book title:</label>
                        <input type="text" name="title" v-model="newTitle"  :placeholder="props.thisBook.title" required>
                    <label for="title py-3">Book author:</label>
                        <input type="text" name="author" v-model="newAuthor" :placeholder="props.thisBook.author" required>
                        <label for="title">Where is?</label>
                       <!-- <select v-model="newLocal" id="isPlace">
                            <option disabled :value="props.thisBook.local"></option>
                            <option v-for="place in places" :value="place.id" :key="place.id">
                                {{place.local}}
                            </option>  
                        </select>-->
                        <label for="title">Get notes?</label>
                            <textarea rows="" cols="40" name="notes" v-model="newNotes" :placeholder="props.thisBook.notes">
                            </textarea>   
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="handleEdit">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        <loader v-else/>  
    </Teleport>

</template>
