<script setup>
  import { ref, watch } from 'vue';
  const props = defineProps({
    pagerEnd: {
        type: Number,
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    },
    pagerAddAmount: {
        type: Number,
        required: true
    },
    totalPageCount: {
        type: Number,
        required: true
    }
  });

  const emits = defineEmits(['update:currentPage']);

  // 換頁
  const currentPage = ref(props.currentPage);
  watch(()=>props.currentPage,(newValue,oldValue) => currentPage.value = newValue);
  
  const setPage = page => {
    if (page < 1 || page > props.totalPageCount) {
        return;
    }
    currentPage.value = page;
    emits('update:currentPage', currentPage.value);
  };
</script>

<template>
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

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
}
</style>