<template>
  <li v-for="task in tasks" :key="task.id" :class="task.completed && 'completed'">
    <span @click="toggleCompleted(task.id)">{{ task.description }} - {{ task.priority }}</span>
    <span @click="$emit('edit', task.id)" class="edit">Edit</span>
    <span @click="removeTask(task.id)" class="remove">X</span>
  </li>
</template>

<script lang="ts" setup>
import type { Task } from '@/use/useTask'
import useTask from '@/use/useTask'

const { removeTask, toggleCompleted } = useTask()

defineProps({
  tasks: Array<Task>
})
defineEmits(['edit'])
</script>
