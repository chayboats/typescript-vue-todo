<template>
  <h1>Todo App</h1>
  <form @submit.prevent="createTask(formData.description, formData.priority)">
    <input v-model="formData.description"/>
    <select v-model="formData.priority">
      <option :value=Priority.LOW>{{ Priority.LOW }}</option>
      <option :value=Priority.MEDIUM>{{ Priority.MEDIUM }}</option>
      <option :value=Priority.HIGH>{{ Priority.HIGH }}</option>
    </select>
    <button>Add</button>
  </form>
  <div>
    <ul v-for="task in tasks" :key="task.id">
      <li><span>{{ task.description }} - {{ task.priority }}</span></li>
    </ul>
  </div>

</template>

<script setup lang="ts">
import { useTask, Priority } from '@/assets/task'
import { ref } from 'vue';
const {createTask, removeTask, tasks} = useTask() 

interface FormData {
  description: string,
  priority: Priority
}
// Come back to this
const defaultFormData:FormData = {description: '', priority: Priority.MEDIUM}

const formData = ref<FormData>({
  description: '',
  priority: Priority.MEDIUM
}) 

function submitForm() {
  createTask(formData.value.description, formData.value.priority)

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
