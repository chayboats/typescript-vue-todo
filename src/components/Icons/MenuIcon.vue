<template>
  <font-awesome-icon @click="$emit('menu')" :icon="['fas', 'sliders']" class="menu" />
</template>

<script setup lang="ts">
defineEmits(['menu'])
</script>
