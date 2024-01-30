<template>
  <div @click="$emit('click')" class="menu-item">
    <div>
      <span class="content">{{ item }}</span>
    </div>
    <hr v-if="!lastItem" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  lastItem: { type: Boolean, value: false },
  item: { type: String, required: true }
})

defineEmits(['click'])
</script>

<style scoped>
.menu-item {
  padding-right: 5rem;
  width: 100%;
}
.menu-item .content {
  text-transform: capitalize;
  padding-left: 0.5rem;
  transition: 300ms;
}

.menu-item :hover {
  cursor: pointer;
  color: #48acac;
}
.menu-item hr {
  width: 100%;
  border: 0.5px solid rgb(210, 210, 210);
}
</style>
