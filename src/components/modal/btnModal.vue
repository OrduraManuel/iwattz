<script setup >
const props = defineProps({
  where: { type: String }
})
let isWhere = '#'+props.where
console.log(isWhere,'questo è il div')
</script>
<template>
<div class="ctaContainer">
    <a  class="createBtn" data-bs-toggle="modal" :data-bs-target="isWhere">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Contattami
    </a>
</div>
</template>
<style lang="scss" scoped>


</style>
