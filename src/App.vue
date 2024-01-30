<template>
  <Header />

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
    <div v-if="tasks.length == 0">
      <p><em>Start adding some tasks</em></p>
      <AddTasksIcon />
    </div>

    <p v-else-if="filteredTasks.length == 0"><em>No results matching your filter</em></p>
    <ul v-else>
      <ListItem
        :tasks="filteredTasks"
        @toggle-completed="toggleCompleted"
        @remove="removeTask"
        @edit="enterEditMode"
      ></ListItem>
    </ul>
  </div>

  <div class="checkbox-container">
    <Checkbox
      v-for="option in defaultFilterOptions"
      :key="option"
      :filter-option="option"
      :checked="true"
      @click="setFilterOptions(option)"
    />
  </div>

  <div class="sort">
    <select v-model="sortOption">
      <option value="default">Sort: Default</option>
      <option value="high">Priority: Low to High</option>
      <option value="low">Priority: High to Low</option>
    </select>
  </div>

  <Filters />

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
import { ref, watch } from 'vue'
import ListItem from './components/ListItem.vue'
import Checkbox from './components/Checkbox.vue'
import AddTasksIcon from './components/Icons/AddTasksIcon.vue'
import Filters from './components/Filters.vue'
import Header from './components/Header.vue'

interface FormData {
  description: string
  priority: Priority
}

const defaultFormData: FormData = { description: '', priority: Priority.MEDIUM }

const addFormData = ref<FormData>({ ...defaultFormData })
const editFormData = ref<FormData>({ ...defaultFormData })
const selectedId = ref<Task['id']>('')
const editMode = ref(false)
const sortOption = ref('default')

const {
  createTask,
  updateTask,
  toggleCompleted,
  sortTasks,
  removeTask,
  setFilterOptions,
  filteredTasks,
  tasks,
  defaultFilterOptions
} = useTask()

function addTask() {
  createTask(addFormData.value.description, addFormData.value.priority)
  Object.assign(addFormData.value, { ...defaultFormData })
  sortTasks(sortOption.value)
}

function toggleEditMode() {
  editMode.value = !editMode.value
}

function enterEditMode(id: Task['id']) {
  toggleEditMode()
  selectedId.value = id
}

function setEditFormData(id: Task['id']) {
  filteredTasks.value.filter((task) => {
    if (task.id == id) {
      editFormData.value.description = task.description
      editFormData.value.priority = task.priority
    }
  })
}

function updateAndExitEditMode() {
  updateTask(selectedId.value, editFormData.value.description, editFormData.value.priority)
  toggleEditMode()
  sortTasks(sortOption.value)
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
.sort {
  grid-column-start: span 2;
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0 3rem 0;
}

button {
  padding: 0.25rem 0.7rem;
}

select {
  padding: 0.5rem 0.7rem;
}

button:hover,
select:hover {
  background-color: #48acac;
  color: white;
  cursor: pointer;
}

button,
select {
  background-color: rgb(230, 230, 230);

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
  transition: 300ms;
}

.checkbox-container {
  display: flex;
  flex-direction: column;
}

.add-task-form {
  display: grid;
  grid-template-columns: 1fr auto auto;
}

.add-task-form input {
  padding: 0.5rem;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 20px 0 #7d959044;
  background-color: #f1f1f1;
}
</style>
