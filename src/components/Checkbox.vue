<template>
  <div style="display: flex">
    <span>
      <span><CheckedBoxIcon /><UncheckedBoxIcon /> </span>
    </span>
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
import CheckedBoxIcon from './Icons/CheckedBoxIcon.vue'
import UncheckedBoxIcon from './Icons/UncheckedBoxIcon.vue'

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
