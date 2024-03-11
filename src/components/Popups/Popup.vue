<template>
  <div class="backdrop" :class="{ up: isOpen }">
    <div class="filter-container" v-if="isOpen">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isOpen: { type: Boolean, required: true }
})
</script>

<style scoped>
.backdrop {
  width: 100%;
  background: linear-gradient(#f6f6f6, rgb(64, 155, 155));
  position: absolute;
  top: 100%;
  left: 0;
  height: 0;
  transition: all 0.3s ease-out;
}

.backdrop.up {
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  height: 100%;
}

.filter-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  max-width: 768px;
  width: 100%;
}
</style>
