<template>
  <nav class="navigation">
    <ul class="fixed-navigation navigation-top top-position">
      <li class="move">
        <router-link :to="`/`">
          <span>
            <img id="logo" alt="Logo" src="/images/icon/logo.png" style="width: 80px" />
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
    <ul
      ref="leftPosition"
      class="fixed-navigation navigation-left left-position"
      :style="{ left: leftPositionStyle.left, opacity: leftPositionStyle.opacity }"
    >
      <li class="move">
        <router-link :to="`about`" class="router" data-move="left">
          <span class="effect-navigation"
            ><span class="nav-indicator-wrapper"
              ><span class="nav-indicator"></span></span
            >About me</span
          >
        </router-link>
      </li>
    </ul>
    <!-- navigation left end -->
    <!-- navigation right start -->
    <ul
      ref="rightPosition"
      class="fixed-navigation navigation-right right-position"
      :style="{ right: rightPositionStyle.right, opacity: rightPositionStyle.opacity }"
    >
      <li class="move">
        <router-link :to="`services`" class="router" data-move="right">
          <span class="effect-navigation"
            ><span class="nav-indicator-wrapper"
              ><span class="nav-indicator"></span></span
            >Mix & Mastering</span
          >
        </router-link>
      </li>
    </ul>
    <!-- navigation right end -->
    <!-- navigation bottom start -->
    <ul
      ref="bottomPosition"
      class="fixed-navigation navigation-bottom bottom-position"
      :style="{ bottom: bottomPositionStyle.bottom, opacity: bottomPositionStyle.opacity }"
    >
      <li class="move">
        <router-link :to="`contact`" class="router" data-move="bottom">
          <span class="effect-navigation"
            ><span class="nav-indicator-wrapper"
              ><span class="nav-indicator"></span></span
            >Contact</span
          >
        </router-link>
      </li>
    </ul>
    <!-- navigation bottom end -->
    <ul
      ref="centerPosition"
      class="fixed-navigation navigation-center center-position"
      :style="{ top: centerPositionStyle.top, opacity: centerPositionStyle.opacity }"
    >
      <li class="move">
        <router-link :to="`selections`" class="router" data-move="center">
          <span class="effect-navigation"
            ><span class="nav-indicator-wrapper"
              ><span class="nav-indicator"></span></span
            >Work's selections</span
          >
        </router-link>
      </li>
    </ul>
    <ul
      ref="dashboardPosition"
      class="fixed-navigation navigation-dashboard dashboard-position"
      :style="{ bottom: dashboardPositionStyle.bottom, right: dashboardPositionStyle.right, opacity: dashboardPositionStyle.opacity }"
    >
      <li class="move">
        <router-link v-if="user" class="router dashboard fa-solid animate__animated animate__delay animate__backInUp" :to="`dashboard`">
          <i class="fa-light fa-comment-music fa-solid animate__animated animate__delay-1s animate__fadeIn"></i>
        </router-link>
        <router-link v-if="user" class="router logout fa-solid animate__animated animate__delay-1s animate__backInUp" @click="handleClick" :to="`/`">
          <i class="fa-solid fa-arrow-right-from-bracket fa-solid animate__animated animate__delay-1s animate__fadeIn"></i>
        </router-link>
        <router-link v-if="!user" class="router firstLog fa-solid animate__animated animate__delay-1s animate__backInUp" :to="`firstLog`">
          <i class="fa-sharp fa-arrow-right-to-arc fa-solid animate__animated animate__delay-2s animate__fadeIn"></i>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, reactive, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import getUser from '@/auth/getUser';
import { auth } from '@/api/config';
import { signOut } from 'firebase/auth';

const router = useRouter();
const { user } = getUser();

const currentPath = ref('');

const handleClick = () => {
  signOut(auth);
};

const leftPositionStyle = reactive({ left: '0', opacity: '0' });
const rightPositionStyle = reactive({ right: '0', opacity: '0' });
const bottomPositionStyle = reactive({ bottom: '0', opacity: '0' });
const centerPositionStyle = reactive({ top: '0', opacity: '0' });
const dashboardPositionStyle = reactive({ bottom: '0', right: '0', opacity: '0' });

watchEffect(async () => {
  const response = router.currentRoute.value.path;
  currentPath.value = response;

  if (currentPath.value === '/') {
    leftPositionStyle.left = 'var(--marginNL)';
    leftPositionStyle.opacity = '1';
    rightPositionStyle.right = 'var(--marginNR)';
    rightPositionStyle.opacity = '1';
    bottomPositionStyle.bottom = 'var(--marginNB)';
    bottomPositionStyle.opacity = '1';
    centerPositionStyle.top = '77vh';
    centerPositionStyle.opacity = '1';
    dashboardPositionStyle.bottom = 'var(--marginB)';
    dashboardPositionStyle.right = 'var(--marginR)';
    dashboardPositionStyle.opacity = '1';
  } else {
    leftPositionStyle.left = '-10%';
    leftPositionStyle.opacity = '0';
    rightPositionStyle.right = '-10%';
    rightPositionStyle.opacity = '0';
    bottomPositionStyle.bottom = '-10%';
    bottomPositionStyle.opacity = '0';
    centerPositionStyle.top = '-10%';
    centerPositionStyle.opacity = '0';
    dashboardPositionStyle.bottom = '-10%';
    dashboardPositionStyle.right = '-10%';
    dashboardPositionStyle.opacity = '0';
  }
});
</script>
