<script setup>
let props = defineProps({
  hasMatchCard: {
    type: Array,
  },
  n: {
    type: Number,
  },
});
</script>
<template>
  <div class="flip-card-inner" v-if="!hasMatchCard.includes(n)">
    <div class="flip-card-front"></div>
    <div class="flip-card-back">
      <img :src="`./img/cat-0${n}.jpg`" alt="" />
    </div>
  </div>
</template>
