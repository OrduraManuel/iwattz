<script setup>
import toBack from '@/components/toBack.vue'
</script>

<template>
    <section  id="services" >
        <div class="container-fluid">
            <toBack  where="/"/>
            <div class="row">
                <div class="col-12">
                    <h2 class="section-heading-all">
                        <span>02.</span> Mix & Mastering online
                    </h2>
                </div>
                <div class="inner-divider"></div>
                <div class="col-12">
                    <h3 class="section-header">
                        Here's  how<span> our</span><br>
                        <span>mixing</span> &amp; <span>mastering</span><br>
                        process <span>works!</span>
                    </h3>
                </div>
                <div class="col-4 col-services section-txt">
                    <h6 class="services">
                        <span class="awesome">01.</span> Purchase &amp; send your files
                    </h6>
                    <p>Choose you files and send us with  <a class="link-underline" href="#">WeTransfer</a>,  <a class="link-underline"
                        href="#">Dropbox</a> or  <a class="link-underline"
                        href="#">GDrive</a> with the dry &amp; wet stems of your song.
                    </p>
                </div>
                <div class="inner-divider-post visible-mobile-devices"></div>
                <div class="col-4 col-services section-txt">
                    <h6 class="services">
                        <span class="awesome">02.</span> We mix your song
                    </h6>
                    <p>Once the files are received, we mix and master your song in our pristine #1 rated recording studio. <a class="link-underline"
                       href="#">Turn around time is 5-10 business days</a>.
                    </p>
                </div>
                <div class="inner-divider-post visible-mobile-devices"></div>
                <div class="col-4 col-services section-txt">
                    <h6 class="services">
                        <span class="awesome">03.</span> Grow your brand
                    </h6>
                    <p>After completion, you'll receive your high-quality WAV file ready to upload online.  <a class="link-underline"
                        href="#">Get new fans, engage your audience, and grow!</a>
                     </p>
                </div>
            </div>
        </div>
    </section>   
</template>
<style lang="scss" scoped>
#services{
  .row{
    padding:4vw 4vh ;
    margin-top: -3vh;
  }
}
</style>