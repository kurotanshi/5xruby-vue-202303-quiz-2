<script setup>
    const props = defineProps({
        cards:{
            type: Array
        },
        openedCard:{
            type: Array
        }
    })
</script>
<template>
    <div class="rounded-xl mx-auto border-4 m-12 grid grid-flow-col p-10 w-[900px] gap-2 grid-rows-4 h-[70vh]">
        <div 
            v-for="(n, idx) in cards"
            class="flip-card"
            :class="{
                'open': openedCard.includes(idx)
            }"
            @click="$emit('updateClickInfo', idx )">
            <div class="flip-card-inner" v-if="cards[idx] > 0">
                <div class="flip-card-front"></div>
                <div class="flip-card-back">
                <img :src="`./img/cat-0${n}.jpg`" alt="">
                </div>
            </div>
            {{ n }} {{ idx }} 
        </div>
    </div>

</template>
<style scoped src="../MatchGame.css"></style>