<script setup>
const props = defineProps({
  searchText: {
    type: String,
  },
});

const emits = defineEmits(["update:searchText"]);
</script>
<template>
  <p>
    站點名稱搜尋:
    <input
      type="text"
      class="border"
      @input="$emit('update:searchText', $event.target.value)"
    />
  </p>
</template>
