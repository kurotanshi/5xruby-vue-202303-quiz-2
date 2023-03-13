<template>
  <div
    class="flip-card"
    :class="{
      open: opened,
    }"
    @click="$emit('cardClicked')"
  >
    <div class="flip-card-inner">
      <div :class="`${paired ? '' : 'flip-card-front'}`"></div>
      <div class="flip-card-back">
        <img :src="`./img/cat-0${card}.jpg`" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  card: {
    type: Number,
  },
  opened: {
    type: Boolean,
  },
  paired: {
    type: Boolean,
  },
});

defineEmits(["cardClicked"]);
</script>

<style scoped src="../MatchGame.css"></style>
