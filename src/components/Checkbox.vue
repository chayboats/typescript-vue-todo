<template>
  <div style="display: flex">
    <input type="checkbox" :id="id" :name="id" />
    <label class="check" style="text-transform: capitalize" :for="id">{{ id }}</label>
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: { type: String, required: true }
})
</script>

<style scoped>
label {
  text-transform: capitalize;
  padding-left: 0.5rem;
}
</style>
