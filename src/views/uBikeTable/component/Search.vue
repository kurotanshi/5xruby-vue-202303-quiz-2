<script setup>
</script>
<template>
    <p>
      站點名稱搜尋: 
      <input 
        type="text" 
        class="border" 
        @input="$emit('update:keyword', $event.target.value)"
        >
    </p>

</template>
<style scoped>

</style>