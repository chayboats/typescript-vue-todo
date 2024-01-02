import { ref } from "vue";
import generateId from "@/utils/uuid";

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

export default function useTask(){
  const tasks = ref <Task[]>([])

  function createTask(description: Task['description'], priority: Task['priority']) {
    const task = {
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

  return {
    createTask,
    removeTask, 
    tasks
  }
}