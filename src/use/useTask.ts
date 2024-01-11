import { ref } from 'vue'
import generateId from '@/utils/uuid'

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

  function sortToHigh(a: string | number, b: string | number) {
    if (a < b) {
      return -1
    }
    return 1
  }

  function sortToLow(a: string | number, b: string | number) {
    if (a > b) {
      return -1
    }
    return 1
  }

  function sortTasks(direction: string) {
    tasks.value.sort((a, b) => {
      if (direction == 'default') {
        const idA = Number(a.id)
        const idB = Number(b.id)
        return sortToHigh(idA, idB)
      }
      const priorities = { Low: 0, Medium: 1, High: 2 }

      const priorityA = priorities[a.priority]
      const priorityB = priorities[b.priority]
      if (direction == 'high') {
        return sortToHigh(priorityA, priorityB)
      }
      return sortToLow(priorityA, priorityB)
    })
  }

  return {
    createTask,
    removeTask,
    sortTasks,
    toggleCompleted,
    updateTask,
    tasks
  }
}
