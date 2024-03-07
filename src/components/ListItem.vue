<template>
  <div v-auto-animate>
    <li v-for="task in tasks" :key="task.id" :class="task.completed && 'completed'">
      <span class="priority-content" @click="$emit('toggleCompleted', task.id)">
        <component
          :class="`priority-icon ${task.priority.toLowerCase()}`"
          :is="priorityIcons[task.priority]"
        ></component>
        <span>{{ task.description }}</span>
      </span>
      <span @click="$emit('edit', task.id)" class="edit">Edit</span>
      <span @click="$emit('remove', task.id)" class="remove">X</span>
    </li>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from '@/use/useTask'
import { Priority } from '@/use/useTask'
import High from './Icons/PriorityIcons/High.vue'
import Medium from './Icons/PriorityIcons/Medium.vue'
import Low from './Icons/PriorityIcons/Low.vue'
defineProps({
  tasks: { type: Array<Task>, required: true }
})
defineEmits(['toggleCompleted', 'edit', 'remove'])

const priorityIcons = {
  [Priority.LOW]: Low,
  [Priority.MEDIUM]: Medium,
  [Priority.HIGH]: High
}
</script>

<style scoped>
li {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
}

li span:nth-of-type(1):hover {
  font-weight: bold;
  cursor: pointer;
}
.edit,
.remove {
  color: rgb(124, 124, 124);
}
.edit:hover {
  color: rgb(47, 99, 255);
  cursor: pointer;
}

.remove:hover {
  color: red;
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
}

.priority-icon {
  border-radius: 50%;
  border: 2px solid;
  padding: 2px;
  aspect-ratio: 1/1;
  font-size: 1.2rem;
}
.priority-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.low {
  color: rgb(0, 95, 95);
  background-color: rgb(214, 255, 255);
}
.medium {
  color: rgb(0, 95, 95);
  background-color: rgb(174, 229, 229);
}
.high {
  color: rgb(0, 95, 95);
  background-color: rgb(65, 169, 169);
}
</style>
