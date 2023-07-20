<script setup>
//import tracksList from '@/components/track/tracksList.vue'
</script>

<template>
<div class="container-fluid">
    <div class="row">
        <div class="hero-heading  animate__animated animate__delay animate__fadeInDown">
            <span class=" heroAnimated  d-none d-md-block">Mix</span> 
            <h2 class=" heroAnimated d-none d-md-block">&amp;</h2>
            <span class="heroAnimated  d-none d-md-block">Mastering</span> 

            <h2 class=" heroAnimated d-none d-md-block">Engineer.</h2>

            <div class="d-md-none">
                <span class=" heroAnimated mobile ">Mix</span> 
                <h2 class=" heroAnimated mobile">&amp;</h2>
                <span class="heroAnimated mobile ">Mastering</span> 
            </div>
            <div class="d-md-none">
                <h2 class=" heroAnimated mobile">Engineer.</h2>
            </div>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>

/* 16. hero heading */
.hero-heading {
    display:flex;
    justify-content: center;
    align-content: center;
    align-self: center;
    align-items: center;
font-family: 'Montserrat', sans-serif;
font-style: normal;
font-weight: 700;
font-size: 55px;
text-align: center;
text-transform: none;
letter-spacing: -0.04em;
color: #363b48;
margin: -1px auto 25px auto;
 -webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
-webkit-text-size-adjust: 100%;
   -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
width: 100%;
line-height: 100%;
    span,h2{
        margin-bottom: 0;
        padding: 0% 1%;
    }

    //@include delay(slideInDown, 3, .3s);
}

@media all and (min-width: 1920px) {
  .hero-heading {
    font-size: 65px;
  }
}

@media only screen and (max-width: 995px) {
  .hero-heading {
    font-size: 45px;
	max-width: 50%;
  }
}

@supports((text-stroke: 1px #e5e5db) or (-webkit-text-stroke: 1px #e5e5db)) {
  .hero-heading {
    color: #e5e5db;
    /*-webkit-text-stroke: 1px #e5e5db;
            text-stroke: 1px #e5e5db; */
    text-shadow: none;
  }
}

@supports((text-stroke: 1px #ff264a) or (-webkit-text-stroke: 1px #ff264a)) {
  .hero-heading span {
    color: #ff264a;
    /*-webkit-text-stroke: 1px #ff264a;
            text-stroke: 1px #ff264a; */
    text-shadow: none;
  }
}

@media only screen and (max-width: 640px) {
  .hero-heading {
    font-size: 35px;
    flex-direction: column;
  }
}
</style>
