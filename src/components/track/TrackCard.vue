<script setup>
import { ref, onMounted } from 'vue';

let props = defineProps({
	thisTrack: Object,
});

const isImageLoaded = ref(false);
onMounted(() => {
  const image = new Image();
  image.src = props.thisTrack.Img.Path;
  image.onload = () => {
    isImageLoaded.value = true;
  };
});

function getHitClass(boolean){
    console.log('this is my boolean: ', boolean)
    if(boolean === true){
        return 'hitClass'
    }else{
        return ''
    }
}
</script>
<template>
  <Suspense>
    <template #default>
      <div class="galleryImg trackCard" :class="getHitClass(props.thisTrack.isFav)">
        <a class="photoDownload" :href="props.thisTrack.Src.Href">{{ props.thisTrack.Src.Option }}</a>
        <img class="imageMasonry"  v-if="isImageLoaded" :src="props.thisTrack.Img.Path" />
        <p class="photoArtist" style="background-color: purple;color:white;">{{ props.thisTrack.Author }}</p>
        <p class="newHit" v-if="props.thisTrack.isFav "> New Hit</p>
      </div>
    </template>
    <template #fallback>
      <div class="galleryImg skeletonCard">
        <a class="photoDownload"></a>
        <img class="imageMasonry" />
        <p class="photoArtist"></p>
      </div>
    </template>
  </Suspense>
</template>

<style scoped lang="scss">
.skeletonCard{
    background: white;
}
.hitClass{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .imageMasonry{
        width:97%;
        height:97%;
        border-radius: var(--radiusM);
        
    }
    &:before{
        content: '';
    position: absolute;
    z-index: -1;
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100%;
    background-color: var(--brandPrimary);//var(--txtLight);
    //border-radius: var(--radiusXl);
    animation: run 1s linear infinite;
    transform: scale(.5);
    filter: blur(6rem);
  }
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

@-webkit-keyframes run {
  0% {
    transform: scale(.5);
  }
  50%{
    transform: scale(1.5);
  }
  100% {
    transform: scale(.5);    
  }
}
</style>