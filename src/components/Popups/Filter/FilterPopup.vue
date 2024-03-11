<template>
  <Popup :is-open="isOpen">
    <div class="container">
      <div class="filter-header">
        <h2>Filters</h2>
        <span style="display: flex; gap: 1rem">
          <button @click="$emit('cancel')" class="cancel">Cancel</button>
          <button @click="$emit('apply')" class="apply">Apply Filters</button>
        </span>
      </div>
      <div class="filters">
        <FilterCard
          v-for="filter in Object.keys(tempFilters)"
          :key="Object.keys(tempFilters).indexOf(filter)"
          v-model="tempFilters[filter]"
          :filter="filter"
        />
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import FilterCard from './FilterCard.vue'
import Popup from '../Popup.vue'

defineEmits(['cancel', 'apply'])

defineProps({
  tempFilters: { type: Object, required: true },
  isOpen: { type: Boolean, required: true }
})
</script>

<style scoped>
.container {
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 3rem;
  height: 100%;
}
.filters {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgb(56, 56, 56);
}
.cancel {
  padding: 0.5rem 0.7rem;
  background-color: #f1f1f1;
  color: rgb(75, 145, 145);
}
.cancel:hover {
  background-color: rgb(43, 43, 43);
  color: rgb(75, 145, 145);
  cursor: pointer;
}
</style>
