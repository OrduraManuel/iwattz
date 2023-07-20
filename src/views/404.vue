<template>
    <div class="notFound">
        <h1>Ooops!</h1>
      <h3>This {{resource}} url isn't exist.</h3>
      <h3>It looks like you're experiencingg some network issues, please take a breath and
           <a href="#" @click="$router.go(-1)">here</a> for turn back </h3>
    </div>
  </template>
  <script>
  
  export default {
     props: {
         resource: {
             type: String,
             required: true,
             default: 'page'
         }
          
      },
  }
  </script>
  <style scoped>
  .notFound{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      color:white;
  }
  
  </style>