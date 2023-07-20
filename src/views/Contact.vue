<script setup>
import toBack from '@/components/toBack.vue'
</script>

<template>
 <section id="contact">
    <div class="container-fluid">
        <toBack  where="/"/>
        <div class="row">
            <div class="col-12">
                <h2 class="section-heading-all">
                    <span>03.</span> contact
                 </h2><!-- page title end -->
            </div>
            <div class="col-lg-12">
                <h3 class="section-header">
                please send an e-mail at the <span>address provided below</span> or feel free to <a class="link-underline link-underline-contact contact-modal-launcher" href=
                "#">use the form</a>.
                </h3><!-- section title end -->
            </div>
            <div class="col-4 col-contact section-txt">
                <h6 class="contact">
                    <span class="awesome">Street</span> Address
                </h6>                    
                <p>Piazza la bomba e Scappa 666</p>
            </div>
            <div class="inner-divider-post visible-mobile-devices"></div>
            <div class="col-md-4 col-contact section-txt">
                <h6 class="contact">
                    <span class="awesome">Phone</span> Number
                </h6>
                <p>+39 666 666 666</p>
            </div>
            <div class="inner-divider-post visible-mobile-devices"></div>
            <div class="col-md-4 col-contact section-txt">
                <h6 class="contact">
                    <span class="awesome">Email</span> Enquiry
                </h6>
                <p>
                    <a class="link-underline" href="mailto:contact@domainname.com">iwattz@igghysounds.com</a>
                </p>
            </div>
        </div>
    </div>
</section>
</template>
<style lang="scss" scoped>
#contact{
    .container-fluid{
        width:100%;
        .row{
            padding:4vw 4vh ;
            margin-top: -3vh;
        }
    }

}
</style>