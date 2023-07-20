<template>
       <div class="contact-modal">
            <!-- container start -->
            <div class="container">
                <!-- center container start -->
                <div class="center-container-contact-modal">
                    <!-- center block start -->
                    <div class="center-block-contact-modal">
                        <!-- row start -->
                        <div class="row center-block-contact-modal-padding-top">
                            <!-- col start -->
                            <div class="col-lg-12">
                                <!-- section title start -->
                                <h2 class="section-heading">
                                    Get in touch
                                </h2><!-- section title end -->
                                <!-- section txt start -->
                                <p>
                                    Promise, we won't stay silent
                                </p><!-- section txt end -->
                            </div><!-- col end -->
                        </div><!-- row end -->
                        <!-- row start -->
                        <div class="row contact-modal-wrapper">
                            <!-- col start -->
                            <div class="col-lg-12">
                                <!-- contact form start -->
                                <div id="contact-form">
                                    <form action="contact.php" id="form" method="post" name="send">
                                        <!-- col start -->
                                        <div class="col-sm-4 col-md-4 col-lg-4">
                                            <input class="requiredField name" id="name" name="name" placeholder="Name" type="text">
                                        </div><!-- col end -->
                                        <!-- col start -->
                                        <div class="col-sm-4 col-md-4 col-lg-4">
                                            <input class="requiredField email" id="email" name="email" placeholder="Email" type="text">
                                        </div><!-- col end -->
                                        <!-- col start -->
                                        <div class="col-sm-4 col-md-4 col-lg-4">
                                            <input class="requiredField subject" id="subject" name="subject" placeholder="Subject" type="text">
                                        </div><!-- col end -->
                                        <!-- col start -->
                                        <div class="make-space">
                                            <textarea class="requiredField message" id="message" name="message" placeholder="Message"></textarea>
                                        </div><!-- col end -->
                                        <div>
                                            <button class="c-btn fullwidth-liquid c-btn-contact-modal-wrapper-only" id="submit" type="submit"><span>Submit</span></button>
                                        </div>
                                    </form>
                                </div><!-- contact form end -->
                            </div><!-- col end -->
                        </div><!-- row end -->
                        <!-- row start -->
                        <div class="row center-block-contact-modal-padding-bottom">
                            <!-- col start -->
                            <div class="col-lg-12">
                                <div class="contact-modal-closer">
                                    <span class="ion-close"></span>
                                </div>
                            </div><!-- col end -->
                        </div><!-- row end -->
                    </div><!-- center block end -->
                </div><!-- center container end -->
            </div><!-- container end -->
        </div><!-- contact modal end -->
</template>