import { ref, computed } from 'vue'
import generateId from '@/utils/uuid'
import { sortToHigh, sortToLow } from '@/utils/sort'

export interface Task {
  description: string
  id: string
  priority: Priority
  completed: boolean
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export default function useTask() {
  const tasks = ref<Task[]>([])
  const defaultFilterOptions = ['completed', 'incomplete', 'high', 'medium', 'low']

  const filterValues = ref([...defaultFilterOptions])

  const filteredTasks = computed(() => {
    let newTasks = tasks.value

    if (!filterValues.value.includes('completed')) {
      newTasks = tasks.value.filter((task) => !task.completed)
    }
    if (!filterValues.value.includes('incomplete')) {
      newTasks = tasks.value.filter((task) => task.completed)
    }

    //DRY
    if (!filterValues.value.includes(Priority.HIGH.toLowerCase())) {
      newTasks = tasks.value.filter((task) => task.priority != Priority.HIGH)
    }

    if (!filterValues.value.includes(Priority.MEDIUM.toLowerCase())) {
      newTasks = tasks.value.filter((task) => task.priority != Priority.MEDIUM)
    }

    if (!filterValues.value.includes(Priority.LOW.toLowerCase())) {
      newTasks = tasks.value.filter((task) => task.priority != Priority.LOW)
    }
    return newTasks
  })

  // filtered values in an array of strings
  // ['completed', 'high']
  // or []

  // computed that returns the tasks with or without the filters being used

  // function to add filters to filtered array

  function setFilterOptions(option: string) {
    const includesOption = filterValues.value.includes(option)

    if (!includesOption) {
      filterValues.value.push(option)
      return
    }

    filterValues.value = filterValues.value.filter((string) => string != option)
  }

  function createTask(description: Task['description'], priority: Task['priority']) {
    const task: Task = {
      description: description,
      id: generateId(),
      priority: priority,
      completed: false
    }

    tasks.value.push(task)
  }

  function removeTask(id: Task['id']) {
    tasks.value = tasks.value.filter((task) => task.id != id)
  }

  function updateTask(
    id: Task['id'],
    description: Task['description'],
    priority: Task['priority']
  ) {
    tasks.value.filter((task) => {
      if (task.id == id) {
        task.description = description
        task.priority = priority
      }
    })
  }

  function toggleCompleted(id: Task['id']) {
    tasks.value.map((task) => {
      if (task.id == id) {
        task.completed = !task.completed
      }
    })
  }

  function sortByDefault(a: Task, b: Task) {
    const idA = Number(a.id)
    const idB = Number(b.id)
    return sortToHigh(idA, idB)
  }

  function sortByPriority(a: Task, b: Task, direction: string) {
    const priorities = { Low: 0, Medium: 1, High: 2 }

    const priorityA = priorities[a.priority]
    const priorityB = priorities[b.priority]
    if (direction == 'high') {
      return sortToHigh(priorityA, priorityB)
    }
    return sortToLow(priorityA, priorityB)
  }

  function sortTasks(direction: string) {
    tasks.value.sort((a, b) => {
      if (direction == 'default') {
        return sortByDefault(a, b)
      }
      return sortByPriority(a, b, direction)
    })
  }

  return {
    createTask,
    removeTask,
    sortTasks,
    toggleCompleted,
    updateTask,
    setFilterOptions,
    filteredTasks,
    defaultFilterOptions,
    tasks
  }
}
