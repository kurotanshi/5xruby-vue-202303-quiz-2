<script setup>
let props = defineProps({
  src: {
    type: String,
  },
});
</script>
<template>
  <div class="flip-card-inner">
    <div class="flip-card-front"></div>
    <div class="flip-card-back">
      <img :src="src" alt="" />
    </div>
  </div>
</template>
