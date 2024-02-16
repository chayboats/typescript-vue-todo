<template>
  <div class="filter-popup">
    <div class="backdrop">
      <div class="width-setter">
        <div class="filter-container">
          <div class="filter-header">
            <h2>Filters</h2>
            <span style="display: flex; gap: 1rem">
              <button @click="$emit('apply')" class="apply">Apply Filters</button>
              <button @click="$emit('cancel')" class="cancel">Cancel</button>
            </span>
          </div>
          <div class="filters">
            <FilterCard
              v-for="filter in filterValues"
              v-model="selectedFilters[filter]"
              :key="filterValues.indexOf(filter)"
              :filter="filter"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilterCard from './FilterCard.vue'
import useTask from '@/use/useTask'
import { ref } from 'vue'

type SelectedFilters = {
  [key: string]: boolean
}

defineEmits(['cancel', 'apply'])

const selectedFilters = ref<SelectedFilters>({})

const { filterValues } = useTask()

filterValues.value.forEach((filter) => selectedFilters.value[filter] = true)
</script>

<style scoped>
.filter-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  background-color: #f6f6f6;
  height: 100%;
}

.backdrop {
  background: linear-gradient(#f6f6f6, rgba(0, 128, 128, 0.273));
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
}

.width-setter {
  min-width: 768px;
}

.filter-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  padding: 2rem;
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
  color: #48acac;
}
</style>
