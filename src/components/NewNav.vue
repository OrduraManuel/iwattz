<script setup>
import getUser from '@/auth/getUser'

import { useRouter } from 'vue-router'
import { ref, watchEffect, onMounted } from 'vue'

// firebase imports
import { auth } from '@/api/config'
import { signOut } from 'firebase/auth'
    const router = useRouter()
    const { user } = getUser()

    const handleClick = () => {
      signOut(auth)
    }

    const currentPath = ref()
    
    watchEffect(async () => {
      const response = await router.currentRoute.value.path
      currentPath.value = await response

      const rightRouter = document.getElementById('rightPosition')
      const leftRouter = document.getElementById('leftPosition')
      const bottomRouter = document.getElementById('bottomPosition')
      const centerRouter = document.getElementById('centerPosition')
      const dashboardRouter = document.getElementById('dashboardPosition')



        if(currentPath.value == '/'){
          rightRouter.style.right = '0%'
          rightRouter.style.opacity = '1'
          leftRouter.style.left = '0%'
          leftRouter.style.opacity = '1'
          bottomRouter.style.bottom = '5vh'
          bottomRouter.style.opacity = '1'
          centerRouter.style.top = '66%'
          centerRouter.style.opacity = '1'
          dashboardRouter.style.bottom = '1vh'
          dashboardRouter.style.right = '6.5vw'
          dashboardRouter.style.opacity = '1'

        } else{ 
          rightRouter.style.right = '-10%'
          rightRouter.style.opacity = '0'
          leftRouter.style.left = '-10%'
          leftRouter.style.opacity = '0'
          bottomRouter.style.bottom = '-10%'
          bottomRouter.style.opacity = '0'
          centerRouter.style.top = '-10%'
          centerRouter.style.opacity = '0'
          dashboardRouter.style.bottom = '-10%'
          dashboardRouter.style.opacity = '0'
        }
    });

    onMounted(() => {
      const els = ref()
      els.value = document.getElementsByClassName("router")
        for (let el of els.value) {
          el.addEventListener('click',function (){
            let checkEl = el.getAttribute("data-move")
            let searchBlack = document.getElementById(checkEl)
            let closer = document.getElementById('closer')
            let logo = document.getElementById('logo')
            const move = [
            { width: 0 + '%'},
            { opacity: 0},
            { width: 100 + '%'},
            { opacity: 1}
            ]
            const time = {
                duration: 500,
                iterations: 1,
            } 
            searchBlack.animate(move,time)
            searchBlack.style.width = '100%'
            searchBlack.style.opacity = '1'
            closer.addEventListener('click',function (){
              const moveOut = [
                { width: 0 + '%'},
                { opacity: 0},
                { width: 100 + '%'},
                { opacity: 1}
                ]
                const timeOut = {
                    duration: 500,
                    iterations: 1,
                } 

                searchBlack.animate(moveOut,timeOut)
                searchBlack.style.width = '100%'
                searchBlack.style.opacity = '0'
                //router.push('/')
            })
            logo.addEventListener('click',function (){
              const moveOut = [
                { width: 0 + '%'},
                { opacity: 0},
                { width: 100 + '%'},
                { opacity: 1}
                ]
                const timeOut = {
                    duration: 500,
                    iterations: 1,
                } 

                searchBlack.animate(moveOut,timeOut)
                searchBlack.style.width = '100%'
                searchBlack.style.opacity = '0'
                router.push('/')
            })
          })

        }
    })
</script>

<template>
    <nav class="navigation">
        <ul class="fixed-navigation navigation-top top-position">
            <li class="move">
                <router-link to="/">
                   <span>
                     <img  id="logo" alt="Logo" src="@/assets/img/logo.png" style="width:70px; ">
                    </span>
                </router-link>
            </li>
        </ul>
            <!-- navigation left start -->
        <ul id="blackone">
          <li id="left"></li>
          <li id="right"></li>
          <li id="bottom"></li>
          <li id="center"></li>
        </ul>
        <ul  id="leftPosition" class="fixed-navigation navigation-left left-position">
            <li class="move">
                <router-link to="About" class="router"  data-move="left"><span class="effect-navigation"><span class="nav-indicator-wrapper"><span class="nav-indicator"></span></span>About me</span></router-link>
            </li>
        </ul><!-- navigation left end -->
            <!-- navigation right start -->
            <ul id="rightPosition" class="fixed-navigation navigation-right right-position">
                <li class="move">
                    <router-link to="Services" class="router" data-move="right">
                      <span class="effect-navigation">
                        <span class="nav-indicator-wrapper">
                          <span class="nav-indicator">
                          </span>
                        </span>
                        Mix &amp; Mastering
                      </span>
                    </router-link>
                </li>
            </ul><!-- navigation right end -->
            <!-- navigation bottom start -->
            <ul  id="bottomPosition" class="fixed-navigation navigation-bottom bottom-position">
                <li class="move">
                    <router-link to="Contact" class="router" data-move="bottom" ><span class="effect-navigation"><span class="nav-indicator-wrapper"><span class="nav-indicator"></span></span>Contact</span></router-link>
                </li>
            </ul><!-- navigation bottom end --> 
            <ul  id="centerPosition" class="fixed-navigation navigation-center center-position">
                <li class="move">
                    <router-link to="Selections" class="router"  data-move="center"><span class="effect-navigation"><span class="nav-indicator-wrapper"><span class="nav-indicator"></span></span>Work's selections</span></router-link>
                </li>
            </ul>
        <ul id="dashboardPosition" class="fixed-navigation navigation-dashboard dashboard-position">
            <li class="move">
              <router-link to="dashboard" data-move="bottom" v-if="user" class="router dashboard fa-solid animate__animated animate__delay animate__backInUp" >
                <i class="fa-light fa-comment-music fa-solid animate__animated animate__delay-1s animate__fadeIn"></i>
              </router-link>
              <router-link to="/" data-move="bottom" v-if="user" @click="handleClick" class="router logout fa-solid animate__animated animate__delay-1s animate__backInUp" >
                <i class="fa-solid fa-arrow-right-from-bracket fa-solid animate__animated animate__delay-1s animate__fadeIn"></i>
              </router-link>
                <router-link to="firstLog" data-move="bottom" v-if="!user" class="router firstLog fa-solid animate__animated animate__delay-1s animate__backInUp">
                  <i class="fa-sharp  fa-arrow-right-to-arc fa-solid animate__animated animate__delay-2s animate__fadeIn"></i>
                </router-link>
            </li>
        </ul>
      </nav>
  </template>
  

  
  <style lang="scss" scoped>

  #blackone{
    #left,#right,#bottom{
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    width:0%;
    height:100%;
    position:absolute;
    }
    #left{
    top:0;
    left:0;
  }
  #right{
    top:0;
    right:0;
  }
  #bottom{
    bottom:0;
    left:0;
  }
  }

.fixed-navigation {
  position: fixed;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.05em;
  font-style: normal;
  text-transform: uppercase;
  text-align: center;
  background: none;
  border: none;
  width: 148px;
  height: 48px;
  line-height: 48px;
   -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
     -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
  z-index: 1;
  }
  .fixed-navigation a,
  .fixed-navigation a:hover {
  outline: none;
  text-decoration: none;
   -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
     -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
  }
  .navigation-right,
  .navigation-right.right-position,
  .navigation-right.navigation-right-position-primary,
  .navigation-bottom,
  .navigation-bottom.bottom-position,
  .navigation-bottom.navigation-bottom-position-primary,
  .navigation-center,
  .navigation-center.center-position,
  .navigation-center.navigation-center-position-primary,
  .navigation-left,
  .navigation-left.left-position,
  .navigation-left.navigation-left-position-primary,
  .navigation-dashboard.dashboard-position,
  .navigation-dashboard.navigation-dashboard-position-primary,
  .navigation-top,
  .navigation-top.top-position,
  .navigation-top.navigation-top-position-primary {
  -webkit-transition: all 1.5s ease;
     -moz-transition: all 1.5s ease;
    -ms-transition: all 1.5s ease;
       -o-transition: all 1.5s ease;
          transition: all 1.5s ease;
  }

  .navigation-dashboard {
  right: 0%;
  bottom: 0vh;
  width: 33%;
  overflow:visible;
  .move{
    display: flex;
    justify-content: end;
    a{
      width: 30px; // larghezza tasti dashboard VARIABILE
      height: 30px; // altezza tasti dashboard VARIABILE
      margin-right: 5%;
      border: 2px #b2b2b2 solid;  //border VARIABILE
      color: #b2b2b2;  //border colore VARIABILE
      line-height: 30px; // altezza / line-height tasti dashboard VARIABILE
      filter: alpha(opacity=50);
      opacity: 0.5;
      transform: scale(1);
      &:hover{
        opacity: 1;
        filter: alpha(opacity=100);
        background: #b2b2b2; //border colore VARIABILE
        cursor: pointer;
        color: black; //NERO colore VARIABILE
        transform: scale(1.2);
      }
      i{
        font-weight: 600;
        font-size: 15px;
      }

      }
    a.dashboard{
      position: relative;
      right: -2px; //border spessore VARIABILE
        &:after{
          content: 'DASHBOARD';
          position: absolute;
          //transform: translate(-50%,-50%);
          top: calc(-2% + -4px); // 2% è il padding, -4px è il bordo * 2
          left: 100px;
          padding: 1% 50%;
          background: transparent;
          border: 2px solid #b2b2b2;
          color: #b2b2b2;
          border-radius: 5px;
          opacity: 0;
          -webkit-transition: all 0.3s ease;
          -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
          -o-transition: all 0.3s ease;
          transition: all 0.3s ease;
          }
        &:hover{
          &:after{
            top: calc(-2% + -4px); // 2% è il padding, -4px è il bordo * 2
            left: -150px;
            opacity: 1;
          }
        }
      }
      a.logout{
      position: relative;
        &:after{
          content: 'LOGOUT';
          position: absolute;
          //transform: translate(-50%,-50%);
          top: calc(-2% + -4px); // 2% è il padding, -4px è il bordo * 2
          left: 100px;
          padding: 1% 50%;
          background: transparent;
          border: 2px solid #b2b2b2;
          color: #b2b2b2;
          border-radius: 5px;
          opacity: 0;
          -webkit-transition: all 0.3s ease;
          -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
          -o-transition: all 0.3s ease;
          transition: all 0.3s ease;
          }
        &:hover{
          &:after{
            top: calc(-2% + -4px); // 2% è il padding, -4px è il bordo * 2
            left: calc(-150px + -33px);
            opacity: 1;
          }
        }
      }
      a.firstLog{
      position: relative;
        &:after{
          content: 'LOGIN';
          position: absolute;
          //transform: translate(-50%,-50%);
          top: calc(-2% + -4px); // 2% è il padding, -4px è il bordo * 2
          left: 100px;
          padding: 1% 50%;
          background: transparent;
          border: 2px solid #b2b2b2;
          color: #b2b2b2;
          border-radius: 5px;
          opacity: 0;
          -webkit-transition: all 0.3s ease;
          -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
          -o-transition: all 0.3s ease;
          transition: all 0.3s ease;
          }
        &:hover{
          &:after{
            top: calc(-2% + -4px); // 2% è il padding, -4px è il bordo * 2
            left: calc(-150px);
            opacity: 1;
          }
        }
      }
  }

  }

  @media only screen and (max-width: 640px) {
    .navigation-dashboard {
      bottom: 0%;
    }
  }
  .navigation-right {
  margin-top: -4vh;
  right: 0%;
  top: 50%;
  -webkit-transform: rotate(90deg);	
     -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
       -o-transform: rotate(90deg);
          transform: rotate(90deg);
  }
  
  @media only screen and (max-width: 640px) {
    .navigation-right {
      right: -5vw;
    }
  }
  
  .navigation-right.right-position,
  .navigation-right.navigation-right-position-primary {
  -webkit-transform: rotate(90deg);
     -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
       -o-transform: rotate(90deg);
          transform: rotate(90deg);
  }

  .navigation-bottom {
  left: 50%;
  bottom: 5vh;
  }

  @media only screen and (max-width: 640px) {
    .navigation-bottom {
      bottom: 5%;
    }
  }
  .navigation-bottom.bottom-position,
  .navigation-bottom.navigation-bottom-position-primary {
transform: translate(-50%,50%);
  }

  .navigation-top {
  left: 50%;
  top: 1vh;
  }
  
  @media only screen and (max-width: 640px) {
    .navigation-top {
      top: 5vh;
    }
  }
  
  .navigation-top.top-position,
  .navigation-top.navigation-top-position-primary {
transform: translate(-50%,50%);
  }

  .navigation-left {
  margin-top: -3vh;
  left: 0%;
  top: 50%;
  -webkit-transform: rotate(-90deg);	
     -moz-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
       -o-transform: rotate(-90deg);
          transform: rotate(-90deg);
  }
  
  @media only screen and (max-width: 640px) {
    .navigation-left {
      left: -5vw;
    }
  }
  
  .navigation-left.left-position,
  .navigation-left.navigation-left-position-primary {
  -webkit-transform: rotate(-90deg);
     -moz-transform:  rotate(-90deg);
      -ms-transform:  rotate(-90deg);
       -o-transform:  rotate(-90deg);
          transform: rotate(-90deg);
  }

/* 6. button effect navigation */
.nav-indicator-wrapper {
  position: absolute;
  top: 15px;
  left: -10px;
  right: 0;
  margin-left: auto; 
  margin-right: auto; 
  width: 15px;
  z-index: -1;
  }
  
  .nav-indicator {
      position: relative;
      display: block;
    margin: 0 auto;
      width: 15px;
      height: 15px;
      padding: 10px;
      background: none;
      -webkit-border-radius: 50%;
         -moz-border-radius: 50%;
              border-radius: 50%;
      cursor: pointer;
      z-index: 2;
  }
  
  .nav-indicator::before {
      content: "";
      position: absolute;
      display: block;
      top: 50%;
      left: 50%;
      padding: 25px;
      margin: 0 auto;
      background: #ff264a;
      -webkit-border-radius: 50%;
         -moz-border-radius: 50%;
              border-radius: 50%;
      -webkit-animation-name: nav-indicator-pulsate;
              animation-name: nav-indicator-pulsate;
      -webkit-animation-duration: 2s;
              animation-duration: 2s;	
      -webkit-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
      -webkit-animation-timing-function: ease-out;
              animation-timing-function: ease-out;
      -webkit-transform: translate(-50%, -50%);
         -moz-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
           -o-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
                  opacity: 0;
             -moz-opacity: 0;
          -webkit-opacity: 0;
      filter: alpha(opacity=0);
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      z-index: -1;
  }
  
  @media only screen and (max-width: 640px) {
    .nav-indicator::before {
      padding: 20px;
    }
  }
  
  @keyframes nav-indicator-pulsate {
    from {
      -webkit-transform: translate(-50%, -50%) scale(0);
         -moz-transform: translate(-50%, -50%) scale(0);
          -ms-transform: translate(-50%, -50%) scale(0);
           -o-transform: translate(-50%, -50%) scale(0);
              transform: translate(-50%, -50%) scale(0);
                  opacity: 1;
             -moz-opacity: 1;
          -webkit-opacity: 1;
        filter: alpha(opacity=100);
       -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    }
    to {
      -webkit-transform: translate(-50%, -50%) scale(1);
         -moz-transform: translate(-50%, -50%) scale(1);
          -ms-transform: translate(-50%, -50%) scale(1);
           -o-transform: translate(-50%, -50%) scale(1);
              transform: translate(-50%, -50%) scale(1);
                  opacity: 0;
             -moz-opacity: 0;
          -webkit-opacity: 0;
        filter: alpha(opacity=0);
       -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    }
  }
  
  .effect-navigation {
  position: relative;
   -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
     -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
  display: inline-block;
  outline: none;
  margin: 10px auto 0 auto;
  width: 170px;
  height: 50px;
  bottom: 10px;
  padding: 0;
  border: none;
  color: red;//#e5e5db;
  background: none;
  -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
  overflow: hidden;
  cursor: pointer;
  -webkit-transition: all 0.3s ease;
     -moz-transition: all 0.3s ease;
      -ms-transition: all 0.3s ease;
     -o-transition: all 0.3s ease;
          transition: all 0.3s ease;
  -webkit-transform: translate(0,0);
     -moz-transform: translate(0,0);
      -ms-transform: translate(0,0);
       -o-transform: translate(0,0);
          transform: translate(0,0);
  }
  
  .effect-navigation::before {
  position: absolute;
  content: "";
          opacity: 1;
     -moz-opacity: 1;
  -webkit-opacity: 1;
  filter: alpha(opacity=100);
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  right: -100%;
  bottom: 0%;
  width: 200%;
  height: 200%;
  color: #e5e5db;
  background: none;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  -webkit-transform: skewX(-60deg);
     -moz-transform: skewX(-60deg);
      -ms-transform: skewX(-60deg);
       -o-transform: skewX(-60deg);
          transform: skewX(-60deg);
  -webkit-transition: all 0.4s ease;
     -moz-transition: all 0.4s ease;
      -ms-transition: all 0.4s ease;
     -o-transition: all 0.4s ease;
        transition: all 0.4s ease;
  z-index: -1;
  }
  
  .effect-navigation::before {
  -webkit-transition: all 0.5s ease;
     -moz-transition: all 0.5s ease;
      -ms-transition: all 0.5s ease;
       -o-transition: all 0.5s ease;
          transition: all 0.5s ease;
  }
  
  .effect-navigation:hover {
  color: #e5e5db;
  background: none;
  }
  
  .effect-navigation:hover::before {
  bottom: -100%;
  right: -200%;
          opacity: 0;
     -moz-opacity: 0;
  -webkit-opacity: 0;
  filter: alpha(opacity=0);
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  }
  
  
  </style>