<script setup>
import { ref } from 'vue';

// 試完成以下功能：
//  1. 點擊卡片，卡片會翻開 (已完成)
//  2. 點擊兩張不同的卡片，卡片會翻回去 
//  3. 點擊兩張相同的卡片，卡片會消失
//  4. 當所有卡片都消失時，顯示「恭喜破關，再來一局？」的對話框，按下確定後重置遊戲
//  5. 將卡片獨立抽出為 Card.vue 元件

const cards = ref([]);
const openedCard = ref([]);

// 遊戲初始化，洗牌
const gameInit = () => {
  const numArr = [...new Array(16).keys()].map(i => ++i); //1~16的array(陣列) 
  numArr.sort(() => Math.random() - 0.5); //sort()判斷大小 給隨機達到洗牌的效果
  cards.value = numArr.map(d => (d % 8) + 1); //1~16的array(陣列)裡面每個數字 d除8 取餘數 (%=取餘數的運算子) 變成0~7 再+1
  openedCard.value = [];
}

const clickHandler = (idx) => {
  const hendCard = cards.value[idx] === 0
  if (openedCard.value.includes(idx) || hendCard) { 
    //includes()判斷openedCard.value裡面是否包含idx陣列的位置 是否為true或false
    // || = A 或 B 兩個條件其中之一成立為true 則A||B為true
    //因為已經定義 hendCard 為cards.value[位置] === 隱藏
    return
  }
  openedCard.value.push(idx);
  if (openedCard.value.length === 2) {
    const cardA = cards.value[openedCard.value[0]]; // 取得第一張卡的值  A卡
    const cardB = cards.value[openedCard.value[1]]; // 取得第二張卡的值  B卡
    if (cardA === cardB) { //當A卡 === B卡
        window.setTimeout(() => { //給於 cardA跟cardB翻開時間
          cards.value[openedCard.value[0]] = 0; 
          cards.value[openedCard.value[1]] = 0; //判斷兩張值一樣時 = 0 (一起消失)
      }, 1000);
    }
      // 一秒後將 openedCard 清空 (牌面覆蓋回去)
    window.setTimeout(() => {
      openedCard.value = [];
    }, 1000);
  }
}
</script>

<template>
  <div class="bg-emerald-900 h-[100vh] w-full top-0 left-0 z-10 absolute">

    <div class="relative max-w-full w-[400px] border-4 rounded-md border-double border-amber-600 m-auto bg-white p-5 mt-5" v-show="hendCard">
      <div class="text-center text-2xl mb-4 font-bold">恭喜破關，要不要再來一局?</div>
      <div class="text-center text-xl">
        <button class="choose pr-5" @click="yupCard = true">要</button>
        <button class="choose" @click="hendCard = false">不要</button>
      </div>
    </div>

    <div class="my-10 text-white text-center ">
      <div class="mb-8 text-5xl">五倍對對碰</div>
      <button 
        @click="gameInit"
        class="choose">開始</button>
    </div>

    <div class="rounded-xl mx-auto border-4 mt-12 grid grid-flow-col p-10 w-[900px] gap-2 grid-rows-4">
      <!-- v-for="(值, 位置) 在 cards裡面" -->
      <!-- 值 = 卡片的號碼 -->
      <div 
        v-for="(n, idx) in cards" 
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
    </div>

   
  </div>
</template>

<style scoped>
  .choose {
    @apply rounded font-bold bg-blue-500 mx-6 text-white py-2 px-4 hover:bg-blue-700;
  }
</style>
<style scoped src="./MatchGame.css"></style>