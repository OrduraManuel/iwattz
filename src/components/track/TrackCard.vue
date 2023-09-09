<script setup>
import { ref, onMounted } from 'vue';

import { useAuthorStore } from '@/store'
import { storeToRefs } from 'pinia';

let props = defineProps({
	thisTrack: Object,
});

const isImageLoaded = ref(false);



const AuthorStore = useAuthorStore()
const { Authors } = storeToRefs(AuthorStore)

const AuthorName = ref()


onMounted(() => {
  const image = new Image();
  image.src = props.thisTrack.Img.Path;
  image.onload = () => {
    isImageLoaded.value = true;
  };
  findAuthor()
});

async function findAuthor(){
  await Authors.value.forEach(Author =>{
    if(Author.id == props.thisTrack.Author){
      AuthorName.value = Author.Name
    }
  })
}

</script>
    <template v-if="Authors.value">
      <router-link class="galleryImg trackCard" :to="{name: 'selectedTrack', params: {id: props.thisTrack.id}}">
        <div class="hitClass"  v-if="props.thisTrack.isFav">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>  
          <img class="imageMasonry"  v-if="isImageLoaded" :src="props.thisTrack.Img.Path" />
          <div class="photoArtist">{{AuthorName}}</div>
          <p class="newHit" v-if="props.thisTrack.isFav "> New Hit</p>
      </router-link >
    </template>


<style scoped lang="scss">
.trackCard{
  width:100%;
  width:100%;
  cursor:pointer;
  position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: inline-block;
}
.skeletonCard{
    background: white;
}


.hitClass{

    span{
            position: absolute;
            display: block;
            &:nth-child(1){
                top: 0;
                left: -100%;
                width: 100%;
                height: var(--borderSize);
                background: linear-gradient(90deg, transparent, var(--brandPrimary));
                animation: btn-anim1 1s linear infinite;
            }
            &:nth-child(2) {
                top: -100%;
                right: 0;
                width: 2px;
                height: 100%;
                background: linear-gradient(180deg, transparent, var(--brandPrimary));
                animation: btn-anim2 1s linear infinite;
                animation-delay: .25s;
            }
            &:nth-child(3) {
                bottom: 0;
                right: -100%;
                width: 100%;
                height: var(--borderSize);
                background: linear-gradient(270deg, transparent, var(--brandPrimary));
                animation: btn-anim3 1s linear infinite;
                animation-delay: .5s;
            }
            &:nth-child(4) {
                bottom: -100%;
                left: 0;
                width: 2px;
                height: 100%;
                background: linear-gradient(360deg, transparent, var(--brandPrimary));
                animation: btn-anim4 1s linear infinite;
                animation-delay: .75s;
                }
        }  
}
@keyframes btn-anim1 {
  0% {
    left: -100%;
    
  }
  50%,100% {
    left: 100%;
    
  }
}
@keyframes btn-anim2 {
  0% {
    top: -100%;
    
  }
  50%,100% {
    top: 100%;
    
  }
}
@keyframes btn-anim3 {
  0% {
    right: -100%;
    
  }
  50%,100% {
    right: 100%;
    
  }
}
@keyframes btn-anim4 {
  0% {
    bottom: -100%;
    
  }
  50%,100% {
    bottom: 100%;
    
  }
}
</style>