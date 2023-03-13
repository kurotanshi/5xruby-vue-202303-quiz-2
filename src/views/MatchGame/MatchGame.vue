<script setup>
import { ref, watch, onMounted } from "vue";
import Swal from "sweetalert2";

import Card from "./components/Card.vue";

// 試完成以下功能：
//  1. 點擊卡片，卡片會翻開 (已完成)
//  2. 點擊兩張不同的卡片，卡片會翻回去
//  3. 點擊兩張相同的卡片，卡片會消失
//  4. 當所有卡片都消失時，顯示「恭喜破關，再來一局？」的對話框，按下確定後重置遊戲
//  5. 將卡片獨立抽出為 Card.vue 元件
//  -------------------------------------------------------------------
//  6. 在第一張牌翻開之後，開始計算經過時間
//  7. 利用 localStorage，紀錄歷史高分

const cards = ref([]);
const openedCard = ref([]);
const pairedCards = ref([]);
const second = ref(0);
const isGameStarted = ref(false);
const record = ref(0);
const timer = ref(null);

// 遊戲初始化，洗牌
const gameInit = () => {
  const numArr = [...new Array(16).keys()].map((i) => ++i);
  numArr.sort(() => Math.random() - 0.5);
  cards.value = numArr.map((d) => (d % 8) + 1);
  openedCard.value = [];
  pairedCards.value = [];
};

const checkAllDone = () => {
  if (pairedCards.value.length === 16) {
    isGameStarted.value = false;
    setRecord(second.value);
    Swal.fire({
      title: "恭喜破關，再來一局？",
      text: "",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
    }).then((result) => {
      if (result.isConfirmed) {
        gameInit();
        loadRecord();
      }
    });
  }
};

const checkIsPaired = () => {
  if (cards.value[openedCard.value[0]] === cards.value[openedCard.value[1]]) {
    pairedCards.value.push(openedCard.value[0]);
    pairedCards.value.push(openedCard.value[1]);
    checkAllDone();
  }
};

const clickHandler = (idx) => {
  if (openedCard.value.length === 2 || pairedCards.value.includes(idx)) return;
  isGameStarted.value = true;
  openedCard.value.push(idx);

  checkIsPaired();

  // 2 秒後將 openedCard 清空 (牌面覆蓋回去)
  window.setTimeout(() => {
    openedCard.value = openedCard.value.filter((card) => card !== idx);
  }, 2000);
};

const loadRecord = () => {
  const recordTime = localStorage.getItem("5xruby-pair-record");
  if (recordTime) {
    record.value = Number(recordTime);
  } else {
    record.value = 0;
  }
};

const setRecord = (time) => {
  if (record.value === 0) {
    localStorage.setItem("5xruby-pair-record", time);
    return;
  }
  if (time < record.value) {
    localStorage.setItem("5xruby-pair-record", time);
  }
};

watch(isGameStarted, (start) => {
  if (start) {
    second.value = 0;
    timer.value = window.setInterval(() => {
      second.value += 1;
    }, 1000);
  } else {
    window.clearInterval(timer.value);
  }
});

onMounted(() => {
  loadRecord();
});
</script>

<template>
  <div class="bg-emerald-900 h-[100vh] w-full top-0 left-0 z-10 absolute">
    <div class="my-10 text-white text-center">
      <div class="mb-8 text-5xl">五倍對對碰</div>
      <button
        @click="gameInit"
        class="rounded font-bold mx-6 text-white py-2 px-4 bg-blue-500 hover:bg-blue-700 disabled:bg-slate-50 disabled:text-slate-500"
        :disabled="isGameStarted"
      >
        開始
      </button>
      <div class="flex flex-col mt-4 text-xl items-end mr-10">
        <div class="mb-2">經過時間：{{ second }}(秒)</div>
        <div>最快紀錄：{{ record }}(秒)</div>
      </div>
    </div>

    <div
      class="rounded-xl mx-auto border-4 mt-12 grid grid-flow-col p-10 w-[900px] gap-2 grid-rows-4"
    >
      <Card
        v-for="(n, idx) in cards"
        :card="n"
        :opened="openedCard.includes(idx)"
        :paired="pairedCards.includes(idx)"
        @card-clicked="clickHandler(idx)"
      />
    </div>
  </div>
</template>

<style scoped></style>
