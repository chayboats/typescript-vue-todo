import { ref } from "vue";
import generateId from "@/utils/UUID";

export interface Task {
  description: string;
  id: string;
  priority: Priority;
  completed: boolean;
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

const uuid = generateId()

export function useTask(){
  const tasks = ref <Task[]>([])

  function createTask(description: Task['description'], priority: Task['priority']) {
    const task = {
      description: description,
      id: uuid,
      priority: priority,
      completed: false
    }

    tasks.value.push(task)
  }

  function removeTask(id: Task['id']) {
    tasks.value.filter((task) => !task.id)
  }

  return {
    createTask,
    removeTask, 
    tasks
  }
}