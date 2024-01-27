<template>
  <font-awesome-icon @click="$emit('toggleMenu')" :icon="['fas', 'sliders']" class="menu" />
</template>

<script setup lang="ts">
defineEmits(['toggleMenu'])
</script>
