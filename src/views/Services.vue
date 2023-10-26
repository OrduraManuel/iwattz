<script setup>
import toBack from '@/components/toBack.vue'
import ModalContactMe from '@/components/modal/modalContact.vue'
import ModalBtn from '@/components/modal/btnModal.vue'

</script>

<template>
    <section  id="services">
            <toBack  where="/"/>
            <div class="row">
                
            
                <div class="col-12">
                    <h2 class="section-heading-all">
                        <span>02.</span> Mix & Mastering online
                    </h2>
                </div>
                <div class="col-12 ">
                    <h3 class="section-header mt-5">
                        Here's  how<span> our</span>what
                        <span>mixing</span> & <span>mastering</span>
                        process <span>works!</span>
                    </h3>
                </div>
                <div class="col-md-4 col-services section-txt">
                    <h6 class="services  mt-5">
                        <span class="awesome">01.</span> Purchase & send your files
                    </h6>
                    <p>Choose you files and send us with  <a class="link-underline" href="#">WeTransfer</a>,  <a class="link-underline"
                        href="#">Dropbox</a> or  <a class="link-underline"
                        href="#">GDrive</a> with the dry & wet stems of your song.
                    </p>
                </div>
                <div class="col-md-4 col-services section-txt">
                    <h6 class="services">
                        <span class="awesome">02.</span> We mix your song
                    </h6>
                    <p>Once the files are received, we mix and master your song in our pristine #1 rated recording studio. <a class="link-underline"
                       href="#">Turn around time is 5-10 business days</a>.
                    </p>
                </div>
                <div class="col-md-4 col-services section-txt">
                    <h6 class="services">
                        <span class="awesome">03.</span> Grow your brand
                    </h6>
                    <p>After completion, you'll receive your high-quality WAV file ready to upload online.  <a class="link-underline"
                        href="#">Get new fans, engage your audience, and grow!</a>
                     </p>
                </div>
            <ModalBtn />
        </div>
        <ModalContactMe />
    </section>  
</template>

<style lang="scss" scoped>
</style>