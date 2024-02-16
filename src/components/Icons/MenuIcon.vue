<template>
  <font-awesome-icon @click="$emit('click')" :icon="['fas', 'sliders']" class="menu" />
</template>

<script setup lang="ts">
defineEmits(['click'])
</script>
