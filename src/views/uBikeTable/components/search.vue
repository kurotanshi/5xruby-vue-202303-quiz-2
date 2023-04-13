<script setup>
// 搜尋文字
const searchText = ref('');
// 監聽搜尋文字，若有變動則將頁碼歸 1
watch(searchText, () => {
  currentPage.value = 1;
});
// 篩選後的站點資料
const filtedUbikeStops = computed(() => {
  return uBikeStops.value.length === 0
    ? []
    : uBikeStops.value.filter(d => d.sna.includes(searchText.value));
});
</script>
<template>
    <p>
        站點名稱搜尋: <input type="text" class="border" v-model="searchText">
    </p>
</template>