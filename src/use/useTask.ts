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

  const defaultFilterOptions = ['completed', ...Object.values(Priority)]

  const filterValues = ref([...defaultFilterOptions])

  function filterTask(task: Task, filter: string) {
    switch (filter) {
      case 'completed':
        return task.completed === true
      case Priority.LOW:
        return task.priority === Priority.LOW
      case Priority.MEDIUM:
        return task.priority === Priority.MEDIUM
      case Priority.HIGH:
        return task.priority === Priority.HIGH
      default:
        return task.completed === false
    }
  }

  const filteredTasks = computed(() => {
    let filteredTasks = tasks.value

    filterValues.value.forEach((filter) => {
      filteredTasks = filteredTasks.filter((task) => filterTask(task, filter))
    })

    return filteredTasks
  })

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
