<template>
  <p>
    站點名稱搜尋:
    <input
      type="text"
      class="border"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </p>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
  },
});
</script>

<style scoped></style>
