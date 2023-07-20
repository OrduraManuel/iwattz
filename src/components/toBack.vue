<script setup lang="ts">
const props = defineProps({
  where: { type: String, required: true}
})

</script>
<template>
    <router-link  :to="props.where" id="closer" class="section-closer animate__animated animate__delay-1s animate__backInDown closer">
      <i class="fa-regular fa-arrow-left"></i>
    </router-link>
</template>
<style lang="scss" scoped >

/* 24. section closer */
.section-closer {
position: fixed;
left: 6.5vw;
top: 8vh;
width: 50px;
height: 50px;
line-height: 50px;
cursor: pointer;
font-size: 30px;
text-align: center;
color: rgba(0, 0, 0, 0.5);
background: transparent;
      border: 2px #5f5f5f solid;
      color: #5f5f5f;
-webkit-border-radius: 3px;
   -moz-border-radius: 3px;
   transform: scale(1);
        border-radius: 3px;
-webkit-transition: all 1.5s ease;
   -moz-transition: all 1.5s ease;
	-ms-transition: all 1.5s ease;
     -o-transition: all 1.5s ease;
        transition: all 1.5s ease;
z-index: 4;
&:hover{
        opacity: 1;
        background: #5f5f5f;
        cursor: pointer;
        color: black;
        transform: scale(1.1);
}
}

@media only screen and (max-width: 880px) {
  .section-closer {
    right: 8%;
	bottom: 5%;
  } 
}



.section-closer:hover {
        opacity: 1;
   -moz-opacity: 1;
-webkit-opacity: 1;
filter: alpha(opacity=100);
-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
}


</style>