<template>
  <Popup :is-open="isOpen">
    <form class="edit-form" @submit.prevent="$emit('submit')">
      <div class="header">
        <h2>Edit Task</h2>
        <span style="display: flex; gap: 1rem">
          <button type="button" @click="$emit('cancel')" class="cancel">Cancel</button>
          <button type="submit" class="update">Update</button>
        </span>
      </div>
      <div class="content">
        <input required type="text" v-model="data.description" />
        <select v-model="data.priority">
          <option :value="Priority.LOW">{{ Priority.LOW }}</option>
          <option :value="Priority.MEDIUM">{{ Priority.MEDIUM }}</option>
          <option :value="Priority.HIGH">{{ Priority.HIGH }}</option>
        </select>
      </div>
    </form>
  </Popup>
</template>

<script setup lang="ts">
import Popup from '../Popup.vue';
import { Priority } from '@/use/useTask'

defineEmits(['submit', 'cancel'])
defineProps({
  data: { type: Object, required: true },
  isOpen: { type: Boolean, required: true }
})
</script>

<style scoped>
.edit-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  border-radius: 0.25rem;
}
.edit-form .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.edit-form .content {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
}
.cancel {
  padding: 0.5rem 0.7rem;
  background-color: #f1f1f1;
  color: rgb(75, 145, 145);
}
.cancel:hover {
  background-color: rgb(43, 43, 43);
  color: rgb(75, 145, 145);
  cursor: pointer;
}
</style>
