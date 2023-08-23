<script setup >
//import { update, get } from "@/api/crud";
import { watchEffect, ref, reactive, onMounted, inject } from "vue";
import toBack from '@/components/toBack.vue'
import { useRouter } from 'vue-router'

import { useTrackStore } from '@/store'
const TrackStore = useTrackStore()

//props ID passata 
const props = defineProps({
  id: { type: Object, required: true},
})


const stocazzissimo = ref(null)
//On mounted faccio andare SearchHandler che popola thisTrack con l'id della Props
onMounted(()=>{
    thisTrack.value = null
    //SrcOptions = null
  searchHandler()
})

const thisTrack = ref({});

const router = useRouter()

const SrcOptions = ref([
  'spotify','tidal','youtube'
])
// function get thisTrack
async function  searchHandler() {
    thisTrack.value = await TrackStore.getTrack(props.id)//get('Tracks', props.id);
    console.log(thisTrack.value,'<--- HANDLER thistrack')
    console.log(thisTrack.value.Src?.Option)

}
// function delete thisTrack
function deleteHandler(id) {
    TrackStore.deleteTrack(id)
    router.push('/dashboard');
}

async function updateHandler(id, updateTrack) {
    //update(colRef, id, updateTrack);
    await TrackStore.updateTrack(id, updateTrack)
    .then(() =>{
        router.push('/dashboard');
    })
    .catch(error => {
          router.push({
            name: '404Resource',
            params: { resource: error }
          })
        })
    searchHandler();
}
function stocazzo(){
    console.log(thisTrack.value,'sstocazzo', stocazzissimo,'quest?')
}

</script>
<template>
    <div class="editTrack" v-if="thisTrack">
        <div class="container-fluid">
            <toBack  where="/dashboard"/>
            <div class="row editHeader">
                <div class="col-6 ">
                    <p>Stai modificando: </p>
                    <div class="label">
                        <h4>{{thisTrack.Title}}</h4>
                    </div>
                </div>
                <div class="col-6">

                </div>
            </div>
            <div class="row editBody">
                <div class="col-4 title squareHole">
                    <div class="label">
                        <label for="title">Track Title:</label>
                        <input type="text" name="title" v-model="thisTrack.Title"  :placeholder="thisTrack.Title"  required> <!--v-model="newAuthor" :placeholder="props.thisTrack.Author" -->
                    </div>
                </div>
                <div class="col-4 author squareHole">       
                    <div class="label">
                        <label for="title">Track Author:</label>
                        <input type="text" name="author" v-model="thisTrack.Author"  :placeholder="thisTrack.Author"  required> <!--v-model="newAuthor" :placeholder="props.thisTrack.Author" -->
                    </div>
                </div>
                <div class="col-4 number ">
                    <div class="label squareHole">
                        <label for="title">La sua posizione:</label>
                        <input type="number" name="number" v-model="thisTrack.Number" :placeholder="thisTrack.Number" required> <!-- v-model="newNumber" :placeholder="props.thisTrack.Number" -->
                    </div>
                </div>
                <div class="col-6 link squareHole">
                    <div class="label">
                        <label for="title">Da dove proviene il link:</label>
                        <div class="gridWrapper" >
                            <label class="radioCard" v-for="SrcOption in SrcOptions" :key="SrcOption">
                                <input type="radio" 
                                :id="SrcOption" 
                                :value="SrcOption"
                                v-model="thisTrack.Src.Option"
                                v-if="thisTrack.Src?.Option"
                                />
                                <div class="cardContentWrapper">
                                <span class="checkIcon">
                                    
                                </span>
                                <div class="cardContent">
                                    <!--<p>v-model="thisTrack.Src.Option"</p>-->
                                    <h4>{{ SrcOption}}</h4>
                                </div>
                                </div>
                                
                            </label>
                        </div>                    
                    </div>
                    <div class="label">
                        <label for="title">Get link:</label>
                        <input type="text" v-model="thisTrack.Src.Href"  name="src" :placeholder="thisTrack.Src.Href" required>
                    </div>
                </div>                
                <div class="col-6 img squareHole">
                    <div class="label">
                        <label for="title">Get Image:</label>
                        <input type="text" v-model="thisTrack.Src.Href"  name="src" :placeholder="thisTrack.Src.Href" required>
                    </div>
                </div>
                <div class="col-12 my-5">
                    <div class="btnContainer d-flex justify-content-center">
                        <button type="button" class="btn btn-danger mx-5 "  @click="deleteHandler(props.id)" >Delete</button>
                        <button type="button" class="btn btn-primary mx-5 " @click="updateHandler(props.id, thisTrack )">Save changes</button> <!-- @click="handleEdit" -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    <style lang="scss" scoped>


.editTrack{
    .editHeader{
        p{
            margin-bottom: -1%;
            opacity: .6;
            font-style: italic;
        }
        .label{
            h4{
                color: var(--textLight);
            }
            input{
                border-radius: var(--radiusS);
                max-width: 2.5rem;
                margin-top: .3rem;
            }
        }

    }
    .editBody{
        .label{
            display: flex;
            flex-direction: column;
            label{
                margin-bottom: -1%;
                opacity: .6;
                font-style: italic;
            }
            input{
                border-radius: var(--radiusS);
                //max-width: 2.5rem;
                margin-top: .3rem;
            }
        }
        .number{
            display:flex;
            justify-content: flex-end;
                input{
                //border-radius: var(--radiusS);
                max-width: 2.5rem!important;
                //margin-top: .3rem;
                }
            }
        .link{
margin-top: calc(var(--borderSize) - var(--borderSize)  - var(--borderSize));
        }
        .img{
            margin-top: calc(var(--borderSize) - var(--borderSize)  - var(--borderSize));

        }
        .squareHole{
            border: var(--border);
            padding: 1rem;
            transition: .5s all ease-in-out;
            
            &:hover{
                transform: translateY(-6.66%);
                transition: .2s all ease-in-out;
                backdrop-filter: blur(10px);
                background: rgba(255,255,255,.2);
            }
        }
    }
}
</style>