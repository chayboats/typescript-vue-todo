<template>
  <Popup :is-open="isOpen">
    <div class="container">
      <div class="filter-header">
        <h2>Filters</h2>
        <span style="display: flex; gap: 1rem">
          <button @click="$emit('apply')" class="apply">Apply Filters</button>
          <button @click="$emit('cancel')" class="cancel">Cancel</button>
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
import Popup from './Popup.vue'

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

button {
  padding: 0.25rem 0.7rem;
  border-radius: 0.25rem;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  transition: 300ms;
}

.apply {
  color: white;
  background-color: rgb(56, 56, 56);
  border: none;
}
.apply:hover {
  background-color: #48acac;
  color: white;
  cursor: pointer;
}

.cancel {
  border: 1px solid rgb(56, 56, 56);
}

.cancel:hover {
  border-color: #48acac;
  cursor: pointer;
  color: white;
}
</style>
