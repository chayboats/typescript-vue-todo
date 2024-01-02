<template>
  <h1>Todo App</h1>
  <form @submit.prevent="submitForm">
    <input v-model="formData.description" />
    <select v-model="formData.priority">
      <option :value="Priority.LOW">{{ Priority.LOW }}</option>
      <option :value="Priority.MEDIUM">{{ Priority.MEDIUM }}</option>
      <option :value="Priority.HIGH">{{ Priority.HIGH }}</option>
    </select>
    <button>Add</button>
  </form>
  <div>
    <ul v-for="task in tasks" :key="task.id">
      <li>
        <span>{{ task.description }} - {{ task.priority }}</span>
        <span @click="removeTask(task.id)">X</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import useTask, { Priority } from '@/use/useTask'
import { ref } from 'vue'

interface FormData {
  description: string
  priority: Priority
}

const defaultFormData: FormData = { description: '', priority: Priority.MEDIUM }

const formData = ref<FormData>({ ...defaultFormData })

const { createTask, removeTask, tasks } = useTask()

function submitForm() {
  createTask(formData.value.description, formData.value.priority)
  Object.assign(formData.value, { ...defaultFormData })
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
li {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

li span:nth-of-type(2) {
  font-weight: bold;
}

li span:nth-of-type(2):hover {
  color: red;
  cursor: pointer;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
@/use/task
