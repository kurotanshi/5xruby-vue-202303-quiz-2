<template>
  <nav v-if="pageEnd > 0">
    <ul class="pagination">
      <li
        @click.prevent="$emit('setPageNum', currentPage - 1)"
        class="page-item"
      >
        <a class="page-link" href>Previous</a>
      </li>

      <li
        v-for="i in pageEnd"
        :class="{ active: i + pageAddAmount === currentPage }"
        :key="i"
        @click.prevent="$emit('setPageNum', i + pageAddAmount)"
        class="page-item"
      >
        <a class="page-link" href>{{ i + pageAddAmount }}</a>
      </li>

      <li
        @click.prevent="$emit('setPageNum', currentPage + 1)"
        class="page-item"
      >
        <a class="page-link" href>Next</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  pageEnd: {
    type: Number,
  },
  currentPage: {
    type: Number,
  },
  pageAddAmount: {
    type: Number,
  },
});

defineEmits(["setPageNum"]);
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
}
</style>
