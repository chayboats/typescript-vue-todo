<template>
  <div style="display: flex">
    <input
      @click="$emit('click')"
      type="checkbox"
      :id="filterOption"
      :name="filterOption"
      :value="filterOption"
      :checked="checked"
    />
    <label class="check" style="text-transform: capitalize" :for="filterOption">{{
      filterOption
    }}</label>
  </div>
</template>

<script setup lang="ts">

defineProps({
  filterOption: { type: String, required: true },
  checked: { type: Boolean, required: true }
})

defineEmits(['click'])
</script>

<style scoped>
label {
  text-transform: capitalize;
  padding-left: 0.5rem;
}
</style>
