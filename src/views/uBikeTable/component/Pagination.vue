<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    currentPage:{
        type: Number,
        default:1
    },
    maxPage:{
        type: Number,
        default:10
    },
    totalPageCount:{
        type: Number
    }
})
const emit = defineEmits(['setCurrentPage'])

// 分頁的尾端
const pagerEnd = computed(() => {
  return props.totalPageCount <= props.maxPage
    ? props.totalPageCount
    : props.maxPage;
});
// 分頁的位移，用來確保目前的頁碼在中間
const pagerAddAmount = computed(() => {
  const tmp =
    props.totalPageCount <= props.maxPage
      ? 0
      : props.currentPage + 4 - pagerEnd.value;
  return tmp <= 0
    ? 0
    : props.totalPageCount - (props.maxPage + tmp) < 0
      ? props.totalPageCount - props.maxPage
      : tmp;
});
// 換頁
const setPage = page => {
  if (page < 1 || page > props.totalPageCount) {
    return;
  }
  emit('setCurrentPage', page)
//   props.props.currentPage = page;
};

</script>
<template>
    <!-- 頁籤 -->
    <nav v-if="pagerEnd > 0">
    <ul class="pagination">
        <li @click.prevent="setPage(currentPage - 1)" class="page-item">
        <a class="page-link" href>Previous</a>
        </li>

        <li v-for="i in pagerEnd" :class="{ active: i + pagerAddAmount === currentPage }" :key="i"
        @click.prevent="setPage(i + pagerAddAmount)" class="page-item">
        <a class="page-link" href>{{ i + pagerAddAmount }}</a>
        </li>

        <li @click.prevent="setPage(currentPage + 1)" class="page-item">
        <a class="page-link" href>Next</a>
        </li>
    </ul>
    </nav>

</template>
<style scoped>
.pagination {
  display: flex;
  justify-content: center;
}
</style>