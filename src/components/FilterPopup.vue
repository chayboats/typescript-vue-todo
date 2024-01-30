<template>
  <div class="filter-popup">
    <div class="backdrop">
      <div class="width-setter">
        <div class="filter-container">
          <div class="filter-header">
            <h2>Filters</h2>
            <span @click="$emit('cancel')" class="cancel">Cancel</span>
          </div>
          <div class="filters">
            <FilterCard
              v-for="filter in defaultFilterOptions"
              :key="defaultFilterOptions.indexOf(filter)"
              :filter="filter"
            />
          </div>
          <button @click="$emit('apply')" class="apply">Apply Filters</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilterCard from './FilterCard.vue'
import useTask from '@/use/useTask'

const { defaultFilterOptions } = useTask()

defineEmits(['cancel', 'apply'])
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
  height: 100%;
}

.filter-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
}

.cancel:hover {
  color: rgb(1, 157, 157);
  cursor: pointer;
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgb(56, 56, 56);
}

button:hover {
  background-color: #48acac;
  color: white;
  cursor: pointer;
}

button {
  width: 100%;
  color: white;
  background-color: rgb(56, 56, 56);
  padding: 0.25rem 0.7rem;
  border: none;
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
</style>
