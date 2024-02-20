<template>
  <div v-auto-animate @click="handleClick" class="filter" :class="filterClasses">
    <h2>{{ filter }}</h2>
    <CheckIcon v-if="selected" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CheckIcon from './Icons/CheckIcon.vue'

const props = defineProps({
  filter: { type: String, required: true }
})

const emits = defineEmits(['click'])

const selected = defineModel()

const filterClasses = computed(() => (selected.value ? props.filter : `${props.filter} unselected`))

function toggleSelected() {
  selected.value = !selected.value
}

function handleClick() {
  toggleSelected()
  emits('click')
}
</script>

<style scoped>
.filter {
  border-radius: 0.5rem;
  color: white;
  transition: 250ms;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
}
.filter:hover {
  cursor: pointer;
}

.unselected {
  color: rgba(255, 255, 255, 0.326);
}

h2 {
  text-transform: capitalize;
  margin: 0;
}
.completed {
  background-color: rgb(32, 95, 95);
}
.incomplete {
  background-color: rgb(45, 133, 133);
}

.Low {
  background-color: rgb(88, 165, 165);
}
.Medium {
  background-color: rgb(116, 188, 156);
}

.High {
  background-color: rgb(68, 126, 99);
}

.completed.unselected {
  background-color: rgb(56, 98, 98);
}

.incomplete.unselected {
  background-color: rgb(72, 139, 139);
}

.Low.unselected {
  background-color: rgb(107, 170, 170);
}

.Medium.unselected {
  background-color: rgb(126, 185, 158);
}

.High.unselected {
  background-color: rgb(78, 128, 105);
}
</style>
