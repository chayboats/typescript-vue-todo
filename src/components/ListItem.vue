<template>
  <div v-auto-animate>
    <li v-for="task in tasks" :key="task.id" :class="task.completed && 'completed'">
      <span @click="$emit('toggleCompleted', task.id)"
        >{{ task.description }} - {{ task.priority }}</span
      >
      <span @click="$emit('edit', task.id)" class="edit">Edit</span>
      <span @click="$emit('remove', task.id)" class="remove">X</span>
    </li>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from '@/use/useTask'

defineProps({
  tasks: { type: Array<Task>, required: true }
})
defineEmits(['toggleCompleted', 'edit', 'remove'])
</script>

<style scoped>
li {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
  margin: 0;
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
</style>
