<script setup>
import { computed } from "vue";
const props = defineProps({
  currentPage: {
    type: Number,
  },
  filtedUbikeStopsLength: {
    type: Number,
  },
  PAGINATION_MAX: {
    type: Number,
  },
  COUNT_OF_PAGE: {
    type: Number,
  },
});

const emit = defineEmits(["update:currentPage"]);

// 換頁
const setPage = (page) => {
  if (page < 1 || page > totalPageCount.value) {
    return;
  }
  emit("update:currentPage", page);
};

// 分頁的位移，用來確保目前的頁碼在中間
const pagerAddAmount = computed(() => {
  const tmp =
    totalPageCount.value <= props.PAGINATION_MAX
      ? 0
      : props.currentPage + 4 - pagerEnd.value;
  return tmp <= 0
    ? 0
    : totalPageCount.value - (props.PAGINATION_MAX + tmp) < 0
    ? totalPageCount.value - props.PAGINATION_MAX
    : tmp;
});

// 總頁數
const totalPageCount = computed(() => {
  return Math.ceil(props.filtedUbikeStopsLength / props.COUNT_OF_PAGE);
});
// 分頁的尾端
const pagerEnd = computed(() => {
  return totalPageCount.value <= props.PAGINATION_MAX
    ? totalPageCount.value
    : props.PAGINATION_MAX;
});
</script>
<template>
  <nav v-if="pagerEnd > 0">
    <ul class="pagination">
      <li @click.prevent="setPage(currentPage - 1)" class="page-item">
        <a class="page-link" href>Previous</a>
      </li>

      <li
        v-for="i in pagerEnd"
        :class="{ active: i + pagerAddAmount === currentPage }"
        :key="i"
        @click.prevent="setPage(i + pagerAddAmount)"
        class="page-item"
      >
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
