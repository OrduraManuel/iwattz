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

      <router-link class="galleryImg trackCard" :to="{name: 'SelectedTrack', params: {id: props.thisTrack.id}}">
        <div :class="getHitClass(props.thisTrack.isFav)">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        </div>  
          <a class="photoDownload" :href="props.thisTrack.Src.Href" target="_blank">{{ props.thisTrack.Src.Option }}</a>
          <img class="imageMasonry"  v-if="isImageLoaded" :src="props.thisTrack.Img.Path" />
          <p class="photoArtist" style="background-color: purple;color:white;">{{ props.thisTrack.Author }}</p>
          <p class="newHit" v-if="props.thisTrack.isFav "> New Hit</p>
      </router-link >
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

    //padding: 10px 20px;
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