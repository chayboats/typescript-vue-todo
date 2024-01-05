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

  <div class="filter-btn-container">
    <button @click="toggleFilter" :class="filter && 'filter'">Filter Completed</button>
  </div>

  <div>
    <ul v-if="!filter">
      <ListItem :tasks="tasks" @edit="enterEditMode"></ListItem>
    </ul>
    <div class="filteredTasks" v-else>
      <ul>
        <ListItem :tasks="uncompletedTasks" @edit="enterEditMode"></ListItem>
      </ul>
      <ul>
        <ListItem :tasks="completedTasks" @edit="enterEditMode"></ListItem>
      </ul>
    </div>
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
        <button @click="toggleEditMode">Cancel</button>
        <button type="submit">Update</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import useTask, { Priority, type Task } from '@/use/useTask'
import { ref, computed } from 'vue'
import ListItem from './components/ListItem.vue'

interface FormData {
  description: string
  priority: Priority
}

const defaultFormData: FormData = { description: '', priority: Priority.MEDIUM }

const formData = ref<FormData>({ ...defaultFormData })

const editFormData = ref<FormData>({ ...defaultFormData })

const selectedId = ref<Task['id']>('')

const editMode = ref(false)

const filter = ref(false)

const { createTask, updateTask, tasks } = useTask()

const completedTasks = computed<Task[]>(() => tasks.value.filter((task) => task.completed))

const uncompletedTasks = computed<Task[]>(() => tasks.value.filter((task) => !task.completed))

function submitForm() {
  createTask(formData.value.description, formData.value.priority)
  Object.assign(formData.value, { ...defaultFormData })
}

function toggleEditMode() {
  editMode.value = !editMode.value
}

function enterEditMode(id: Task['id']) {
  toggleEditMode()
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
  toggleEditMode()
}

function toggleFilter() {
  filter.value = !filter.value
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

ul {
  padding: 0;
}

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

.form-and-filter {
  display: grid;
  gap: 3rem;
}

button,
select {
  cursor: pointer;
}
.filter {
  color: white;
  background-color: black;
}

.filter-btn-container {
  grid-column-start: span 2;
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
}
.filteredTasks {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
