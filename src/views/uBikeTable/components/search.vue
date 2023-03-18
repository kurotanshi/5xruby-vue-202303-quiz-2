<script setup>
    const props = defineProps(['searchText']);
    const emits = defineEmits(['update:searchText']);
</script>

<template>
    <input type="text" class="border" :value="searchText"  @input="emits('update:searchText',$event.target.value)" />
</template>