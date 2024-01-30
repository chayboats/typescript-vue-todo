<template>
  <div class="filters">
    <FilterCard v-for="filter in defaultFilterOptions" :key="defaultFilterOptions.indexOf(filter)" :filter="filter"/>
  </div>


</template>
<script setup lang="ts">
import FilterCard from './FilterCard.vue';
import useTask from '@/use/useTask';

const {defaultFilterOptions} = useTask()

</script>

<style>
.filters {
  position: absolute;
  top: 2rem;
  right: 0;
  left: 2rem;
  height: 100%;
  z-index: 1;
  border-radius: 0.5rem 0 0 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(46, 53, 52);
  width: 100%;
  gap: 1rem;
  padding: 2rem 0;
}
</style>
