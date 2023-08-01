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
          rightRouter.style.right = 'var(--marginNR)'
          rightRouter.style.opacity = '1'
          leftRouter.style.left = 'var(--marginNL)'
          leftRouter.style.opacity = '1'
          bottomRouter.style.bottom = 'var(--marginNB)'
          bottomRouter.style.opacity = '1'
          centerRouter.style.top = '77vh'
          centerRouter.style.opacity = '1'
          dashboardRouter.style.bottom = 'var(--marginB)'
          dashboardRouter.style.right = 'var(--marginR)'
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
                     <img  id="logo" alt="Logo" src="@/assets/img/logo.png" style="width: 80px">
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
                        Mix & Mastering
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
                    <router-link to="selections" class="router"  data-move="center">
                      <span class="effect-navigation">
                        <span class="nav-indicator-wrapper">
                          <span class="nav-indicator"></span>
                        </span>Work's selections</span>
                      </router-link>
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