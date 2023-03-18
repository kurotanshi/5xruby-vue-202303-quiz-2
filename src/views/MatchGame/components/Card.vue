<script setup>
import { toRefs, watch,ref } from 'vue';

const props = defineProps({
  idx: {
    type: Number,
    required: true
  },
  n: {
    type: Number,
    required: true
  },
  openedCard: {
    type: Array,
    required: true
  },
  cards: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(["update:openedCard","update:cards"]);

const idx = ref(props.idx);
const n = ref(props.n);
const openedCard = ref(props.openedCard);
const cards = ref(props.cards);

watch(()=>props.cards, (newVal) => {
  cards.value = newVal;
}, { deep: true });

watch(()=>props.openedCard, (newVal) => {
  openedCard.value = newVal;
}, { deep: true });

const clickHandler = (idx) => {    
  openedCard.value.push(idx);
  emits("update:openedCard", openedCard.value);

  if(openedCard.value.length === 2) {

     // 點擊兩張相同的卡片，卡片會消失
    if (openedCard.value.length === 2 && cards.value[openedCard.value[0]] === cards.value[openedCard.value[1]]) {
      cards.value[openedCard.value[0]] = 0;
      cards.value[openedCard.value[1]] = 0;
      emits("update:cards", cards.value);
    }

    // 無論點擊兩張不同的卡片或是兩張相同的卡片，openedCard 都須重製
    window.setTimeout(() => {
      openedCard.value = [];
      emits("update:openedCard", openedCard.value);
    },1000);
  }
}
</script>

<template>
 
  <div 
    class="flip-card"
    :class="{
      'open': openedCard.includes(idx)
    }"
    @click="clickHandler(idx)">
    <div class="flip-card-inner" v-if="cards[idx] > 0">
      <div class="flip-card-front"></div>
      <div class="flip-card-back">
        <img :src="`./img/cat-0${n}.jpg`" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped src="../MatchGame.css"></style>