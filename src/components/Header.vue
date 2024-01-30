<template>
  <header>
    <div class="app-logo">
      <Logo />
      <span class="logo-title">Todo App</span>
    </div>

    <div v-auto-animate class="menu-container">
      <MenuIcon @toggle-menu="toggleMenu" />
      <div v-if="isMenuOpen" class="menu-content">
        <MenuItem @click="$emit('filter')" :item="'filter'" />
        <MenuItem @click="$emit('sort')" :item="'sort'" :last-item="true" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MenuItem from './MenuItem.vue'
import MenuIcon from './Icons/MenuIcon.vue'
import Logo from './Icons/Logo.vue'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

const emits = defineEmits(['filter', 'sort'])


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
  font-size: 1.2rem;
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
}
.menu-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
