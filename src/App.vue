<template>
  <div>
    <h1>Todo App</h1>
  </div>

  <form @submit.prevent="addTask">
    <input required type="text" v-model="addFormData.description" />
    <select v-model="addFormData.priority">
      <option :value="Priority.LOW">{{ Priority.LOW }}</option>
      <option :value="Priority.MEDIUM">{{ Priority.MEDIUM }}</option>
      <option :value="Priority.HIGH">{{ Priority.HIGH }}</option>
    </select>
    <button type="submit">Add</button>
  </form>

  <div class="sort-and-filter">
    <button>Filter Completed</button>

    <select v-model="sortOption" class="sort">
      <option value="default">Sort: Default</option>
      <option value="high">Priority: Low to High</option>
      <option value="low">Priority: High to Low</option>
    </select>
  </div>

  <div class="checkbox-container">
    <Checkbox
      v-for="option in Object.keys(filterOptions)"
      :key="option"
      :filter-option="option"
      :checked="filterOptions[option as keyof typeof filterOptions]"
      @click="filterTasks(option)"
    />
  </div>

  <div v-auto-animate style="grid-column-start: 2">
    <ul>
      <ListItem
        :tasks="tasks"
        @toggle-completed="toggleCompleted"
        @remove="removeTask"
        @edit="enterEditMode"
      ></ListItem>
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
        <button type="button" @click="toggleEditMode">Cancel</button>
        <button type="submit">Update</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import useTask, { Priority, type Task } from '@/use/useTask'
import { ref, computed, watch } from 'vue'
import ListItem from './components/ListItem.vue'
import Checkbox from './components/Checkbox.vue'

interface FormData {
  description: string
  priority: Priority
}

interface FilterOptions {
  completed: boolean
  incomplete: boolean
  high: boolean
  medium: boolean
  low: boolean
}

const defaultFormData: FormData = { description: '', priority: Priority.MEDIUM }

const defaultFilterOptions: FilterOptions = {
  completed: true,
  incomplete: true,
  high: true,
  medium: true,
  low: true
}

const addFormData = ref<FormData>({ ...defaultFormData })
const editFormData = ref<FormData>({ ...defaultFormData })
const selectedId = ref<Task['id']>('')
const editMode = ref(false)
const sortOption = ref('default')

const filterOptions = ref<FilterOptions>({ ...defaultFilterOptions })
const filterMode = computed(() => toggleFilterMode)


const filteredTasks = ref<Task[]>([])
const completedTasks = computed<Task[]>(() => tasks.value.filter((task) => task.completed))
const incompleteTasks = computed<Task[]>(() => tasks.value.filter((task) => !task.completed))
const highTasks = computed<Task[]>(() =>
  tasks.value.filter((task) => (task.priority = Priority.HIGH))
)
const mediumTasks = computed<Task[]>(() =>
  tasks.value.filter((task) => (task.priority = Priority.MEDIUM))
)
const lowTasks = computed<Task[]>(() =>
  tasks.value.filter((task) => (task.priority = Priority.MEDIUM))
)

const { createTask, updateTask, toggleCompleted, sortTasks, removeTask, tasks } = useTask()

function addTask() {
  createTask(addFormData.value.description, addFormData.value.priority)
  Object.assign(addFormData.value, { ...defaultFormData })
  sortTasks(sortOption.value)
}

function toggleEditMode() {
  editMode.value = !editMode.value
}

function toggleFilterMode() {
  const optionValues = Object.values(filterOptions.value)
  const containsFalse = optionValues.indexOf(false)

  console
  return containsFalse != -1
}

function enterEditMode(id: Task['id']) {
  toggleEditMode()
  selectedId.value = id
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

function toggleFilters(option: string) {
  filterOptions.value[option as keyof FilterOptions] =
    !filterOptions.value[option as keyof FilterOptions]
}

function filterTasks(option: string) {
  toggleFilters(option)
  let newTasks: Task[] = []
  tasks.value.forEach((task) => {
    if (filterOptions.value.completed && task.completed) {
      newTasks.push(task)
    }
    if (!filterOptions.value.completed && !task.completed) {
      newTasks.push(task)
    }
    if (filterOptions.value.high && task.priority == 'High') {
      newTasks.push(task)
    }
    if (filterOptions.value.medium && task.priority == 'Medium') {
      newTasks.push(task)
    }
    if (filterOptions.value.low && task.priority == 'Low') {
      newTasks.push(task)
    }
  })
  tasks.value = newTasks
}

watch(selectedId, setEditFormData)
watch(sortOption, sortTasks)
</script>

<style scoped>
form:nth-of-type(1) > * {
  margin-right: 1rem;
}

ul {
  padding: 0;
  column-span: 1 2;
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

button,
select {
  cursor: pointer;
}
.filter {
  color: white;
  background-color: black;
}

.sort-and-filter {
  grid-column-start: span 2;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0 3rem 0;
}
.filteredTasks {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  padding: 0.25rem 0.5rem;
}

select {
  padding: 0.2rem 0.5rem;
}

button,
select {
  border: none;
  border-radius: 0.25rem;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  background-color: rgb(239, 239, 239);
}

.checkbox-container {
  display: flex;
  flex-direction: column;
}
</style>
