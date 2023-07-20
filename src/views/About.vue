<script setup>
import toBack from '@/components/toBack.vue'
</script>

<template>
        <section id="about" >
            <div class="container-fluid">
                <toBack  where="/"/>
                <div class="row">
                    <div class="col-lg-12">
                        <h2 class="section-heading-all">
                            <span>01.</span> about me:  Igor Ambrosino
                        </h2>
                    </div>
                    <div class="inner-divider"></div>
                    <div class="col-lg-12">
                        <h3 class="section-header">
                            We've over a <span>decade</span> of audio <br>
                            <span>mixing</span> and <span>mastering</span> experience.<br>
                            IWATTZ and his team 've learned from some of the  <span>best audio engineers in the world</span>.
                        </h3>
                    </div>
                    <div class="col-md-4 section-txt">
                        <p> We help our clients release songs that everyone can connect to, and listen to over again. We strive to <a class="link-underline" href="#">get the exact sound that is in your head</a> into your mix by any means possibile. .</p>
                    </div>
                    <div class="col-md-4 section-txt">
                        <p>If you want a company that will truly care about your sound and collaborate with you to realize your vision, <a class="link-underline" href="#">IWATTZ</a> will be sure to deliver.</p>
                    </div>
                </div>
            </div>
        </section>
</template>
<style lang="scss" scoped>
#about{
  .row{
    padding:4vw 4vh ;
    margin-top: -3vh;
  }
}
</style>