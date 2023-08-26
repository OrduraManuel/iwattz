<script setup>
import { ref, onMounted } from 'vue';

let props = defineProps({
	thisTrack: Object,
});

const isImageLoaded = ref(false);

onMounted(() => {
  const image = new Image();
  image.src = props.thisTrack.Img.Path;
  image.onload = () => {
    isImageLoaded.value = true;
  };
});
</script>
<template>
    <td class='td tdNumber text-truncate'>{{props.thisTrack.Number}}</td>
    <td class='td text-truncate'>{{props.thisTrack.Author}}</td>
    <td class='td text-truncate'>{{props.thisTrack.Title}}</td>
    <td class='td text-truncate'>{{props.thisTrack.isFav}}</td>
    <td class='td text-truncate'>
        <img :src="props.thisTrack.Img.Path" style="width: 80px"  v-if="isImageLoaded"/>
    </td>
    <td class='td text-truncate'><a :href="props.thisTrack.Src" target="_blank">Spotify</a></td>
    <td class='td'>
        <router-link class='my-auto btn btn-success' :to='{ name:"EditTrack", params: {id: props.thisTrack.id}}'> edit</router-link>
    </td>    
</template>