<script setup>
import { useAuthorStore } from '@/store'
import { storeToRefs } from 'pinia';

import { watchEffect, onMounted, ref } from 'vue';

import basicModal from '@/components/auth/basicModal.vue';
import tableItem from '@/components/auth/Authors/tableItem.vue';

import loader from '@/components/loader.vue';


const AuthorStore = useAuthorStore()
const { Authors } = storeToRefs(AuthorStore)
const { AuthorsLimit } = storeToRefs(AuthorStore)
const { nextAuthors } = storeToRefs(AuthorStore)
const { prevAuthors } = storeToRefs(AuthorStore)
const { Author } = storeToRefs(AuthorStore) // for manage the modal's opening

async function  limitHandler() {
  await AuthorStore.getLimitedAuthors( perPage.value, 'Number')
  .then(()=>{
    prevBtn.value.classList.add('disabled')
    nextBtn.value.classList.remove('disabled')
  })
}
async function  nextHandler() {
  await AuthorStore.getNextAuthors( perPage.value, 'Number',nextAuthors.value)
  .then(async ()=>{
    prevBtn.value.classList.remove('disabled')
    let firstAuthors = Authors.value[0]
    let lastAuthors = Authors.value[Authors.value.length - 1]
    let nextAuthorsId = await Reflect.get(nextAuthors.value,'id')
    if( lastAuthors.id == nextAuthorsId){
      nextBtn.value.classList.add('disabled')
    }
    let prevAuthorsId = await Reflect.get(prevAuthors.value,'id')
    if( firstAuthors.id != prevAuthorsId){
      prevBtn.value.classList.remove('disabled')
    }
  })
}
async function  prevHandler() {
  await AuthorStore.getPrevAuthors( perPage.value, 'Number',prevAuthors.value)
  .then(()=>{
    let firstAuthors = Authors.value[0]
    let lastAuthors = Authors.value[Authors.value.length - 1]
    let nextAuthorsId = Reflect.get(nextAuthors.value,'id')
    if( lastAuthors.id != nextAuthorsId){
      nextBtn.value.classList.remove('disabled')
    }
    let prevAuthorsId = Reflect.get(prevAuthors.value,'id')
    if( firstAuthors.id == prevAuthorsId){
      prevBtn.value.classList.add('disabled')
    }
  })
}
const prevBtn = ref()
const nextBtn = ref()

//let sel = ref(null);
let LimitAuthors = [3,4,5];
let perPage = ref(3);


function activeModal(thisAuthor){
  //! Non si può aggiorare la const Author
	// Author = thisAuthor;
}

watchEffect( () =>{
  //perPage.value = 1;
	//Author.value = null;
    limitHandler();
});


</script>
<template>
  <div class='table-responsive'>

    <table class='tableDashboard' v-if='AuthorsLimit'>
    <thead>
      <tr class='tableHead'>
        <th class='col colNumber'>#</th>
        <th class='col'>Author</th>
        <th class='col'>Title</th>
        <th class='col'>isFav</th>
        <th class='col'>Image</th>
        <th class='col'>Url</th>
        <th class='col'>Action</th>
        <th class='col'></th>

      </tr>
      
    </thead>
    <tbody>
      <tr v-for='AuthorLimit in AuthorsLimit' :key='AuthorLimit.id'>
        <tableItem :thisAuthor='AuthorLimit'/>
        <!--
        <td class='td'>
          <button
          class='my-auto btn btn-success' 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal"
          @click='activeModal(Author)'> edit in modal</button>
        </td>
                  data-bs-toggle='modal' 
          data-bs-target='#exampleModal' -->
      </tr>
    </tbody>
    </table>   
    <table v-else>
        <loader>
          <i class="fa fa-spinner" aria-hidden="true"></i>
        </loader>  
    </table>
  </div>
    <nav class="mx-auto my-5" aria-label="Page navigation example">
      <ul class="pagination pagination-lg justify-content-center" >
        <li class="page-item">
          <select v-model="perPage" value="3" class="page-link">
            <option v-for="LimitAuthor in LimitAuthors" :value="LimitAuthor" :key="LimitAuthor.id">
              {{ LimitAuthor }}
            </option>
          </select>
        </li>
        <li class="page-item">
          <a class="page-link  disabled" ref="prevBtn" href="#" aria-label="Previous"  @click="prevHandler">
            <span aria-hidden="true">PREV</span>
          </a>
        </li>
        <li class="page-item" >
          <a class="page-link "  ref="nextBtn"  href="#" aria-label="Next" @click="nextHandler">
            <span aria-hidden="true">NEXT</span>
          </a>
        </li>
      </ul>
    </nav>
 
  <template>
    <basicModal 
    :thisAuthor='AuthorLimit' 
    /> <!-- !== null || sel !== undefined-->

  </template>
    <!--v-if=' sel !== null'-->
</template>
<style scoped lang="scss">
table{
  tbody{
    tr{

        @include delay(slideInRight, 3, .35s); 
    }
  }
}
.pagination{
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.post {
  width: 220px;
  height: 80px;
}
.post .avatar {
  float: left;
  width: 52px;
  height: 52px;
  background-color: #ccc;
  border-radius: 25%;
  margin: 8px;
  background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
  background-size: 600px;
  animation: shine-avatar 1.6s infinite linear;
}
.post .line {
  float: left;
  width: 140px;
  height: 16px;
  margin-top: 12px;
  border-radius: 7px;
  background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
  background-size: 600px;
  animation: shine-lines 1.6s infinite linear;
}
.post .avatar + .line {
  margin-top: 11px;
  width: 100px;
}
.post .line ~ .line {
  background-color: #ddd;
}

@keyframes shine-lines {
  0% {
    background-position: -100px;
  }
  40%, 100% {
    background-position: 140px;
  }
}
@keyframes shine-avatar {
  0% {
    background-position: -32px;
  }
  40%, 100% {
    background-position: 208px;
  }
}
</style>