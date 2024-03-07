<template>
  <Popup :is-open="isOpen">
    <form class="edit-form" @submit.prevent="$emit('submit')">
      <div class="header">
        <h2>Update Task</h2>
        <span style="display: flex; gap: 1rem">
          <button type="submit" class="update">Update</button>
          <button type="button" @click="$emit('cancel')" class="cancel">Cancel</button>
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
import Popup from './Popup.vue'
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
.edit-form .update {
  color: white;
  background-color: rgb(56, 56, 56);
  border: none;
}
.edit-form .update:hover {
  background-color: #48acac;
  color: white;
  cursor: pointer;
}

.edit-form .cancel {
  border: 1px solid rgb(56, 56, 56);
}

.edit-form .cancel:hover {
  border-color: #48acac;
  cursor: pointer;
  color: white;
}
</style>
