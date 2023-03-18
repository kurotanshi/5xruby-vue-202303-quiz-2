<script setup>
    const props = defineProps({
        isModalVisible:{
            type: Boolean
        },
        openedCard:{
            type: Array
        }
    })
</script>
<template>
    <!-- modal-->
    <div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id" v-if="isModalVisible">
      <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <!--content-->
          <div class="text-center p-5 flex-auto justify-center">
            <h2 class="text-xl font-bold py-4 ">{{ isGameWin ? '恭喜破關，再來一局？': '遊戲結束，再試一次？' }}</h2>
          </div>
          <!--footer-->
          <div class="p-3  mt-2 text-center space-x-4 md:block">
              <button class="rounded font-bold bg-white text-gray-600 py-2 px-10 0 hover:bg-gray-100 shadow-sm border" @click="$emit('isGameRestart',false)">取消</button>
              <button class="rounded font-bold bg-blue-500 text-white py-2 px-6 hover:bg-blue-700 " @click="$emit('isGameRestart',false)">再玩一次</button>
          </div>
      </div>
    </div>

</template>
<style scoped src="../MatchGame.css"></style>