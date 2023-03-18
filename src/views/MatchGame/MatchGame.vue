<script setup>
import { ref , watch , computed } from 'vue';
import Card from './component/Card.vue';
import Modal from './component/Modal.vue';

// 試完成以下功能：
//  1. 點擊卡片，卡片會翻開 (已完成)
//  2. 點擊兩張不同的卡片，卡片會翻回去 
//  3. 點擊兩張相同的卡片，卡片會消失
//  4. 當所有卡片都消失時，顯示「恭喜破關，再來一局？」的對話框，按下確定後重置遊戲
//  5. 將卡片獨立抽出為 Card.vue 元件

const cards = ref([]);
const openedCard = ref([]);

const isGameStart = ref(false)
const isGameWin = ref(false)
const timer = ref(60)

const isModalVisible = ref(false)


// 遊戲初始化，洗牌
const gameInit = () => {
  const numArr = [...new Array(16).keys()].map(i => ++i);
  numArr.sort(() => Math.random() - 0.5);
  cards.value = numArr.map(d => (d % 8) + 1);
  openedCard.value = [];
  isGameStart.value = true
  isGameWin.value = false
  timer.value = 60
}

const clickHandler = (idx) => {
  // 第一次點擊    
  if(!openedCard.value.length) return openedCard.value.push(idx);

  // 第二次點擊
  const idx0 = openedCard.value[0]
  openedCard.value.push(idx);
  if(cards.value[idx0] === cards.value[idx] && idx0 !== idx ){
    // 一秒後照片隱藏 openedCard 清空 (牌面覆蓋回去)
    window.setTimeout(() => {
      cards.value.splice(idx, 1, -1)
      cards.value.splice(idx0, 1, -1)
      openedCard.value = [];

      // 當遊戲結束時 跳視窗
      if(cards.value.every(n => n < 0)) modalOpen('win')
    }, 1000);
 
  }else{
    // 一秒後將 openedCard 清空 (牌面覆蓋回去)
    window.setTimeout(() => {
      openedCard.value = [];
    }, 1000);
  }
}

// modal
const modalOpen = (res) => {
  isModalVisible.value = true
  switch(res) {
    case 'win':
      isGameWin.value = true
      break;
      
    case 'fail':
      isGameWin.value = false
      break;

    default:
      isGameWin.value = false
      break;
  }
  isGameStart.value = false
}

const isGameRestart = (boolean) => {
  isModalVisible.value = false
  if(boolean) gameInit()
}

// 倒數計時器
const setTimes = setInterval( ()=>{
  if( isGameStart.value ) timeCountDown()
}, 1000);

const timeCountDown = () => {
  // 時間到結束遊戲
  !timer.value && isGameStart.value
  ? modalOpen('fail')
  : timer.value --
}

</script>

<template>
  <div class="bg-emerald-900 w-full top-0 left-0 z-10 absolute">

    <div class="my-10 text-white text-center ">
      <div class="mb-8 text-5xl">五倍對對碰</div>

      <!-- timer-->
      <div class="my-4 mb-8 text-2xl text-center text-white"> 倒數 {{ timer }} 秒 </div>

      <button 
        @click="gameInit"
        class="rounded font-bold bg-blue-500 mx-6 text-white py-2 px-4 hover:bg-blue-700">{{ isGameStart ? '重置' : '開始' }}</button>
    </div>

      <Card 
        :cards="cards" 
        :openedCard="openedCard"
        @updateClickInfo="clickHandler"
        />
      <Modal
        :isModalVisible="isModalVisible"
        :isGameWin="isGameWin"
        @isGameRestart="isGameRestart"
        />

  </div>
</template>

<style scoped src="./MatchGame.css"></style>