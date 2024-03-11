<template>
  <header style="padding: 1rem 0">
    <div class="app-logo">
      <Logo />
      <span class="logo-title">Todo App</span>
    </div>

    <div v-auto-animate class="menu-container">
      <MenuIcon @click="$emit('menu')" />
      <div v-if="isOpen" class="menu-content">
        <MenuItem @click="$emit('filter')" item="filter" />
        <MenuItem
          @click="toggleSortMenuAndEmit('sort')"
          item="sort"
          :last-item="!isSortMenuOpen"
          :icon="isSortMenuOpen ? arrows.up : arrows.down"
        />
        <div v-if="isSortMenuOpen" v-auto-animate>
          <MenuItem item="default" @click="toggleSortMenuAndEmit('default')" />
          <MenuItem item="low to high" @click="toggleSortMenuAndEmit('high')" />
          <MenuItem item="high to low" :last-item="true" @click="toggleSortMenuAndEmit('low')" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import MenuIcon from './Icons/MenuIcon.vue'
import Logo from './Icons/Logo.vue'
import ArrowDownIcon from './Icons/ArrowIcons/ArrowDownIcon.vue'
import ArrowUpIcon from './Icons/ArrowIcons/ArrowUpIcon.vue'
import { ref } from 'vue'

type emits = 'filter' | 'sort' | 'menu' | 'default' | 'low' | 'high'

defineProps({
  isOpen: { type: Boolean, required: true }
})

const emits = defineEmits(['filter', 'sort', 'menu', 'default', 'low', 'high'])

const isSortMenuOpen = ref(false)

const arrows = {
  down: ArrowDownIcon,
  up: ArrowUpIcon
}

function toggleSortMenuAndEmit(emit: emits) {
  isSortMenuOpen.value = !isSortMenuOpen.value
  emits(emit)
}
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.app-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.logo-title {
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Nunito', sans-serif;
}

.menu {
  color: #76a5a581;
  font-size: 1.5rem;
  transition: 300ms;
}
.menu:hover {
  cursor: pointer;
  color: #48acac;
}
.menu-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f1f1f1;
  border-radius: 5px;
  margin-top: 1.5rem;
  box-shadow: 0 0 20px 0 #7d959044;
  position: absolute;
  padding: 0.5rem 0;
  justify-content: space-between;
  z-index: 3;
  width: 9.5rem;
}
.menu-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>./Icons/MenuIcon.vue./Icons/Logo.vue
