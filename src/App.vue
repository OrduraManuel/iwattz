<template>
  <div class="container-fluid">
    <Swiping />
    <NewNav />
    <Borders />
    <router-view class="homethis animate__animated animate__delay animate__fadeIn" />
  </div>
</template>
<script setup>
import NewNav from "@/components/NewNav.vue";
import Borders from "@/components/Borders.vue";
//import Slider from '@/components/Slider.vue';
import Swiping from "@/components/Swiping.vue";

// GSTORE DA RIPOSIZIONARE

// //const GStore  = inject('GStore')
// //let flashDiv
// //const flashMsg = ref(GStore.value.FlashMessage)

// watchEffect(() => {
//   console.log('sono dentro il watchEffect VALUE', GStore.value.FlashMessage)
//   if(GStore){
//     flashMessageOut()
//   }
// })

// async function flashMessageOut(){
//   console.log(flashDiv,'consolloneprima')
//   flashDiv = await document.getElementById('FlashMessage');
//   console.log(flashDiv,'consollone')
//   if(flashDiv){
//     setTimeout(()=>{
//       flashDiv.classList.remove('animate__fadeInRight')
//       flashDiv.classList.add('animate__fadeOut')
//       console.log(flashDiv,'consollone')
//     },1500)
//   }
// }

</script>
<style lang="scss">
.homethis {
  padding: 0%;
  z-index: 9;
  margin: var(--marginT) var(--marginR) var(--marginB) var(--marginL) !important;
  width: calc(100vw - 15vw);
  height: calc(100vh - 16vh);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  align-self: center;
}
</style>
