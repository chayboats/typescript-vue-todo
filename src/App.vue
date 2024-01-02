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
      <li :class="task.completed && 'completed'">
        <span @click="toggleCompleted(task.id)">{{ task.description }} - {{ task.priority }}</span>
        <span @click="enterEditMode(task)" class="edit">Edit</span>
        <span @click="removeTask(task.id)" class="remove">X</span>
      </li>
    </ul>
  </div>
  <form v-if="editMode">
    <h2>Update Task</h2>
    <input v-model="selectedTask?.description" />
    <select v-model="selectedTask?.priority">
      <option :value="Priority.LOW">{{ Priority.LOW }}</option>
      <option :value="Priority.MEDIUM">{{ Priority.MEDIUM }}</option>
      <option :value="Priority.HIGH">{{ Priority.HIGH }}</option>
    </select>
  </form>
</template>

<script setup lang="ts">
import useTask, { Priority, type Task } from '@/use/useTask'
import { ref } from 'vue'

interface FormData {
  description: string
  priority: Priority
}

const defaultFormData: FormData = { description: '', priority: Priority.MEDIUM }

const formData = ref<FormData>({ ...defaultFormData })

const selectedTask = ref<Task | undefined>({})

const editMode = ref(false)

const { createTask, removeTask, toggleCompleted, tasks } = useTask()

function submitForm() {
  createTask(formData.value.description, formData.value.priority)
  Object.assign(formData.value, { ...defaultFormData })
}

function enterEditMode(task: Task) {
  selectedTask.value = task
  editMode.value = true
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

.disabled {
  display: none;
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
