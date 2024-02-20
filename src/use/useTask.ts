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

type FilterTypes = 'completed' | 'incomplete' | Priority.LOW | Priority.MEDIUM | Priority.HIGH

export interface FilterValues {
  completed: boolean
  incomplete: boolean
  Low: boolean
  Medium: boolean
  High: boolean
}

const tasks = ref<Task[]>([])

// const defaultFilterOptions = ['completed', 'incomplete', ...Object.values(Priority)]

const filterValues = ref<FilterValues>({
  completed: true,
  incomplete: true,
  Low: true,
  Medium: true,
  High: true
})

export default function useTask() {
  const isFilterValid = computed(() => {
    const firstCheck = !filterValues.value.completed && !filterValues.value.incomplete
    const secondCheck =
      !filterValues.value.Low && !filterValues.value.Medium && !filterValues.value.High

    return firstCheck || secondCheck ? false : true
  })

  function isFilterSelected(filter: FilterTypes) {
    return filterValues.value[filter]
  }

  const filteredTasks = computed(() => {
    let newTasks = tasks.value

    if (!isFilterValid.value) return []

    if (!isFilterSelected('incomplete')) {
      newTasks = tasks.value.filter((task) => task.completed)
    }

    if (!isFilterSelected('completed')) {
      newTasks = tasks.value.filter((task) => !task.completed)
    }

    const filterByPriority = (priority: Priority) =>
      (newTasks = newTasks.filter((task) => task.priority != priority))

    Object.values(Priority).forEach((priority) => {
      if (!isFilterSelected(priority)) {
        filterByPriority(priority)
      }
    })
    return newTasks
  })

  function setFilterValues(values: FilterValues) {
    filterValues.value = values
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
    tasks,
    filterValues,
    setFilterValues,
    filteredTasks
  }
}
