<template>
  <Header
    @filter="handleFilterSelect"
    @sort="isSortSelected = true"
    @menu="toggleMenu"
    @default="setSortOptionCloseMenu('default')"
    @high="setSortOptionCloseMenu('high')"
    @low="setSortOptionCloseMenu('low')"
    :is-open="isMenuOpen"
    :sort-option="sortOption"
  />

  <form @submit.prevent="addTask" class="add-task-form">
    <input required type="text" v-model="addFormData.description" />
    <select v-model="addFormData.priority">
      <option :key="priority" v-for="priority in Object.values(Priority)" :value="priority">
        {{ priority }}
      </option>
    </select>
    <button type="submit">Add</button>
  </form>

  <div v-auto-animate class="list">
    <div v-if="task.tasks.value.length == 0">
      <p><em>Start adding some tasks</em></p>
      <AddTasksIcon />
    </div>

    <p v-else-if="task.filteredTasks.value.length == 0">
      <em>No results matching your filter</em>
    </p>
    <ul v-else>
      <ListItem
        :tasks="task.filteredTasks.value"
        @toggle-completed="task.toggleCompleted"
        @remove="task.removeTask"
        @edit="enterEditMode"
      ></ListItem>
    </ul>
  </div>

  <FilterPopup
    :temp-filters="tempFilters"
    @apply="applyFilter"
    @cancel="cancelFilter"
    :is-open="isFilterSelected"
  />

  <EditPopup
    :is-open="editMode"
    :data="editFormData"
    @cancel="toggleEditMode"
    @submit="updateAndExitEditMode"
  />
</template>

<script setup lang="ts">
import useTask, { Priority, type Task } from '@/use/useTask'
import { ref, watch } from 'vue'
import ListItem from './components/ListItem.vue'
import AddTasksIcon from './components/Icons/AddTasksIcon.vue'
import FilterPopup from './components/FilterPopup.vue'
import Header from './components/Header.vue'
import EditPopup from './components/EditPopup.vue'

interface FormData {
  description: string
  priority: Priority
}

const defaultFormData: FormData = { description: '', priority: Priority.MEDIUM }

const task = useTask()

const addFormData = ref<FormData>({ ...defaultFormData })
const editFormData = ref<FormData>({ ...defaultFormData })
const selectedId = ref<Task['id']>('')
const editMode = ref(false)
const sortOption = ref('default')
const isMenuOpen = ref(false)
const isFilterSelected = ref(false)
const isSortSelected = ref(false)
const tempFilters = ref({ ...task.filterValues.value })

function addTask() {
  task.createTask(addFormData.value.description, addFormData.value.priority)
  Object.assign(addFormData.value, { ...defaultFormData })
  task.sortTasks(sortOption.value)
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function handleFilterSelect() {
  isFilterSelected.value = true
  isMenuOpen.value = false
}

function toggleFilterPopup() {
  isFilterSelected.value = !isFilterSelected.value
}

function applyFilter() {
  toggleFilterPopup()
  task.setFilterValues({ ...tempFilters.value })
}

function cancelFilter() {
  toggleFilterPopup()
  tempFilters.value = { ...task.filterValues.value }
}

function setSortOptionCloseMenu(option: string) {
  toggleMenu()
  sortOption.value = option
}

function toggleEditMode() {
  editMode.value = !editMode.value
}

function enterEditMode(id: Task['id']) {
  toggleEditMode()
  selectedId.value = id
}

function setEditFormData(id: Task['id']) {
  task.filteredTasks.value.filter((task) => {
    if (task.id == id) {
      editFormData.value.description = task.description
      editFormData.value.priority = task.priority
    }
  })
}

function updateAndExitEditMode() {
  task.updateTask(selectedId.value, editFormData.value.description, editFormData.value.priority)
  toggleEditMode()
  task.sortTasks(sortOption.value)
}

watch(selectedId, setEditFormData)
watch(sortOption, task.sortTasks)
</script>

<style scoped>
form:nth-of-type(1) > * {
  margin-right: 1rem;
}

ul {
  padding: 0;
  column-span: 1 2;
}

.add-task-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.add-task-form input {
  padding: 0.5rem;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 20px 0 #7d959044;
  background-color: #f1f1f1;
  grid-column: 1 / span 2;
}

@media (min-width: 768px) {
  .add-task-form {
    grid-template-columns: 1fr auto auto;
  }

  .add-task-form input {
    grid-column: unset;
  }
}
</style>
