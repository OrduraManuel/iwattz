<script setup>
  import toBack from "@/components/toBack.vue";
</script>
<template>
  <div id="dashboard">
    <div class="container-fluid">
      <toBack where="/" />
      <div class="row">
        <div class="col-12">
          <div class="links">
            <router-link :to="{name: 'TrackTable'}">Tracks</router-link>
            <router-link :to="{name: 'AuthorTable'}">Authors</router-link>            
            <router-link to="">Img Manager</router-link>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="content">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#dashboard {
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  .row{
  display:flex;
  justify-content: flex-start;
  }

  .links{
    width: 100%;
    height: var(--marginT);
    display:flex;
    justify-content: space-around;
    align-items: center;
    color: white;
    background: purple;
    a{
      color: white;
    }
  }
  .content{
    //background: rgba(255,255,255,.5);
    width: 100%;
    height: 100%;
  }
}
</style>
