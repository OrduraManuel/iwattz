<script setup>

import NewNav from '@/components/NewNav.vue';
import borders from '@/components/borders.vue';
//import Slider from '@/components/Slider.vue';
import Swiping from '@/components/Swiping.vue';
import home from '@/views/Home.vue'

/* GSTORE DA RIPOSIZIONARE

//const GStore  = inject('GStore')
//let flashDiv
//const flashMsg = ref(GStore.value.FlashMessage)
watchEffect(() => {
  console.log('sono dentro il watchEffect VALUE', GStore.value.FlashMessage)
  if(GStore){
        flashMessageOut()
      }
})



async function flashMessageOut(){
      console.log(flashDiv,'consolloneprima')
      flashDiv = await document.getElementById('FlashMessage');
      console.log(flashDiv,'consollone')
      if(flashDiv){
        setTimeout(()=>{
          flashDiv.classList.remove('animate__fadeInRight')
          flashDiv.classList.add('animate__fadeOut')
          console.log(flashDiv,'consollone')
        },1500)
      }
    }

    */
</script>

<template>
  <div class="container-fluid">
    <Swiping/>
    <NewNav />
    <borders />
    <router-view class="homethis animate__animated  animate__delay animate__fadeIn "/>


  </div>
</template>

<style lang="scss">
//@import "@/assets/scss/style.scss";

.homethis{
    //background-color: rgba(0, 255, 255, 0.162); 
    padding: 0%;
    z-index:9;
    margin: 8vh 6.5vw 8vh 6.5vw;
    width: calc(100vw - 13vw);
    height: calc(100vh - 16vh);
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    align-self: center;
    // da cambiare quando è dashboard
    /* 
    margin: 0;//8vh 6.5vw 8vh 6.5vw;
    width: 100vw;//calc(100vw - 13vw);
    height: 100vh;//calc(100vh - 16vh);
    */
}
</style>
