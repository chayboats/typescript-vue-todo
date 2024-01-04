<template>
  <h1>Todo App</h1>
  <form @submit.prevent="submitForm">
    <input required type="text" v-model="formData.description" />
    <select v-model="formData.priority">
      <option :value="Priority.LOW">{{ Priority.LOW }}</option>
      <option :value="Priority.MEDIUM">{{ Priority.MEDIUM }}</option>
      <option :value="Priority.HIGH">{{ Priority.HIGH }}</option>
    </select>
    <button type="submit">Add</button>
  </form>
  <div>
    <ul v-for="task in tasks" :key="task.id">
      <li :class="task.completed && 'completed'">
        <span @click="toggleCompleted(task.id)">{{ task.description }} - {{ task.priority }}</span>
        <span @click="enterEditMode(task.id)" class="edit">Edit</span>
        <span @click="removeTask(task.id)" class="remove">X</span>
      </li>
    </ul>
  </div>
  <div v-if="editMode" class="edit-mode">
    <form @submit.prevent="updateAndExitEditMode">
      <h2>Update Task</h2>
      <input required type="text" v-model="editFormData.description" />
      <select v-model="editFormData.priority">
        <option :value="Priority.LOW">{{ Priority.LOW }}</option>
        <option :value="Priority.MEDIUM">{{ Priority.MEDIUM }}</option>
        <option :value="Priority.HIGH">{{ Priority.HIGH }}</option>
      </select>
      <div class="buttons">
        <button @click="exitEditMode">Cancel</button>
        <button type="submit">Update</button>
      </div>
    </form>
  </div>
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

const editFormData = ref<FormData>({ ...defaultFormData })

const selectedId = ref<Task['id']>('')

const editMode = ref(false)

const { createTask, removeTask, toggleCompleted, updateTask, tasks } = useTask()

function submitForm() {
  createTask(formData.value.description, formData.value.priority)
  Object.assign(formData.value, { ...defaultFormData })
}

function exitEditMode() {
  editMode.value = false
}

function enterEditMode(id: Task['id']) {
  editMode.value = true
  selectedId.value = id

  setEditFormData(id)
}

function setEditFormData(id: Task['id']) {
  tasks.value.filter((task) => {
    if (task.id == id) {
      editFormData.value.description = task.description
      editFormData.value.priority = task.priority
    }
  })
}
function updateAndExitEditMode() {
  updateTask(selectedId.value, editFormData.value.description, editFormData.value.priority)
  exitEditMode()
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

.edit-mode {
  background-color: rgba(0, 14, 61, 0.417);
  backdrop-filter: blur(10px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-mode form {
  border: 1px solid white;
  padding: 3rem;
  background-color: rgb(0, 10, 42);
  border-radius: 0.25rem;
}
.edit-mode .buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding-top: 1rem;
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
