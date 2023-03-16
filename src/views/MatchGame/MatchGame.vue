<script setup>
import Card from "./components/Card.vue";
import { ref, watch } from "vue";

// 試完成以下功能：
//  1. 點擊卡片，卡片會翻開 (已完成)
//  2. 點擊兩張不同的卡片，卡片會翻回去
//  3. 點擊兩張相同的卡片，卡片會消失
//  4. 當所有卡片都消失時，顯示「恭喜破關，再來一局？」的對話框，按下確定後重置遊戲
//  5. 將卡片獨立抽出為 Card.vue 元件

const cards = ref([]);
const openedCard = ref([]);
const recordCard = ref([]);
const hasMatchCard = ref([]);
// 遊戲初始化，洗牌
const gameInit = () => {
  const numArr = [...new Array(16).keys()].map((i) => ++i);
  numArr.sort(() => Math.random() - 0.5);
  cards.value = numArr.map((d) => (d % 8) + 1);
  cards.value = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ];
  openedCard.value = [];
  hasMatchCard.value = [];
  recordCard.value = [];
};

const clickHandler = (idx, n) => {
  if (openedCard.value.length == 2) return;

  if (!recordCard.value.includes(n)) {
    openedCard.value.push(idx);
    recordCard.value.push(n);
  } else if (recordCard.value.includes(n) && !openedCard.value.includes(idx)) {
    openedCard.value.push(idx);
    window.setTimeout(() => {
      hasMatchCard.value.push(n);
    }, 1000);
  }

  if (openedCard.value.length >= 2) {
    window.setTimeout(() => {
      openedCard.value = [];
      recordCard.value = [];
    }, 1000);
  }
};

watch(
  hasMatchCard,
  () => {
    if (hasMatchCard.value.length === 8) {
      openedCard.value = [];
      window.setTimeout(() => {
        let yes = confirm("恭喜通關，要再來一局嗎？");
        if (yes) {
          gameInit();
        }
      }, 800);
    }
  },
  { deep: true }
);
</script>

<template>
  <div
    class="bg-emerald-900 min-h-[100vh] w-full top-0 left-0 z-10 absolute pb-8"
  >
    <div class="my-10 text-white text-center">
      <h1 class="mb-8 text-5xl">五倍對對碰</h1>
      <button
        @click="gameInit"
        class="rounded font-bold bg-blue-500 mx-6 text-white py-2 px-4 hover:bg-blue-700"
      >
        開始
      </button>
    </div>

    <div
      class="rounded-xl mx-auto border-4 mt-12 grid grid-flow-col p-10 w-[900px] gap-2 grid-rows-4"
    >
      <div
        v-for="(n, idx) in cards"
        class="flip-card"
        :class="{
          open: openedCard.includes(idx),
        }"
        @click="clickHandler(idx, n)"
      >
        <Card
          v-if="!hasMatchCard.includes(n)"
          :hasMatchCard="hasMatchCard"
          :src="`./img/cat-0${n}.jpg`"
        />
      </div>
    </div>
  </div>
</template>
<style src="./MatchGame.css"></style>
