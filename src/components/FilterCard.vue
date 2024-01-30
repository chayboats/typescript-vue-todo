<template>
  <div @click="toggleSelected" class="filter" :class="filterClasses">
    <h2>{{filter}}</h2>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  filter: {type: String, required: true}
})

const unselected = ref(false)

const filterClasses = computed(() => {
  if(unselected.value) {
    return `${props.filter} unselected`
  }
  return props.filter
})


function toggleSelected() {
  unselected.value = !unselected.value
}

</script>

<style scoped>
.filter {
  border-radius: 0.5rem;
  background-color: rgb(51, 160, 51);
  color: white;
  width: 100%;
  height: 100%;
  transition: 250ms;
}
.filter:hover {
  cursor: pointer;
}

.unselected {
color: rgba(255, 255, 255, 0.326)
}


h2 {
  text-transform: capitalize;
}
.completed {
  background-color: rgb(1, 92, 92);
}
.incomplete {
  background-color: rgb(0, 137, 137);
}

.Low {
  background-color: rgb(48, 180, 180);
}
.Medium {
  background-color: rgb(116, 188, 116);
}

.High {
  background-color: rgb(68, 126, 68);
}

.completed.unselected {
  background-color: rgb(56, 98, 98)
}

.incomplete.unselected {
  background-color: rgb(84, 126, 126)
}

.Low.unselected {
  background-color: rgb(139, 176, 176)
}

.Medium.unselected {
  background-color: rgb(147, 197, 147)
}

.High.unselected {
  background-color: rgb(98, 138, 98)
}
</style>
