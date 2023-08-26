<script setup>
  import tableTracks from "@/components/auth/Tracks/tableTracks.vue";  
  import toBack from "@/components/toBack.vue";
</script>
<template>
  <div id="dashboard trackDashboard">
    <div class="container-fluid">
      <toBack where="/" />
      <div class="row">
        <div class="col-12">
              <tableTracks />
          <router-link class="createBtn" :to="{name: 'createTrack'}"> ADD </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#dashboard {
    .row{
        padding:0!important;
    }
  .createBtn {
    position: absolute;
    bottom: 9.5vh;
    right: 7.5vw;
    width: 66px;
    height: 66px;
    border: 2px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    transform: scale(1);
    -webkit-transition: all 1.5s ease;
    -moz-transition: all 1.5s ease;
    -ms-transition: all 1.5s ease;
    -o-transition: all 1.5s ease;
    transition: all 1.5s ease;

    &:hover {
      border: 2px solid white;
      color: black;
      background: white;
      transform: scale(1.2);
    }
  }
}
</style>
