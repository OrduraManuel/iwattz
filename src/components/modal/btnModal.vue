<script setup >
const props = defineProps({
  where: { type: String }
})
let isWhere = '#'+props.where
console.log(isWhere,'questo è il div')
</script>
<template>
  <Teleport to="Body">
    <div class="ctaContainer">
        <a  class="createBtn" data-bs-toggle="modal" :data-bs-target="isWhere">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Contattami
        </a>
    </div>
  </Teleport>
</template>
<style lang="scss" scoped>


</style>
