<template>
<div class="ctaContainer">
    <a  class="createBtn" data-bs-toggle="modal" data-bs-target="#ModalContactMe">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Contact me
    </a>
</div>
</template>
<style lang="scss" scoped>
.ctaContainer{
    position: absolute;
    display: inline-block;
    bottom: calc(var(--marginB) / 2);
    right: calc(var(--marginR) / 2);
    width: 6rem!important;
    height: 6rem!important;
}
a{
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: inline-block;
    padding: 10px 20px;
    color: var(--brandPrimary);
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px;
        &:hover{
            background: var(--brandPrimary);
            color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 5px var(--brandPrimary),
                        0 0 25px var(--brandPrimary),
                        0 0 50px var(--brandPrimary),
                        0 0 100px var(--brandPrimary);
            }
        span{
            position: absolute;
            display: block;
            &:nth-child(1){
                top: 0;
                left: -100%;
                width: 100%;
                height: 2px;
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
                animation-delay: .25s
            }
            &:nth-child(3) {
                bottom: 0;
                right: -100%;
                width: 100%;
                height: 2px;
                background: linear-gradient(270deg, transparent, var(--brandPrimary));
                animation: btn-anim3 1s linear infinite;
                animation-delay: .5s
            }
            &:nth-child(4) {
                bottom: -100%;
                left: 0;
                width: 2px;
                height: 100%;
                background: linear-gradient(360deg, transparent, var(--brandPrimary));
                animation: btn-anim4 1s linear infinite;
                animation-delay: .75s
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