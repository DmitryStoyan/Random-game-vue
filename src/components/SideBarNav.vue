<script setup>
import { ref } from 'vue';

const navItems = ref([
  {
    label: 'Мой профиль',
    icon: new URL('../images/icons/auth.png', import.meta.url).href,
    value: 'profile'
  },
  {
    label: 'Друзья',
    icon: new URL('../images/icons/auth.png', import.meta.url).href,
    value: 'friends'
  },
  {
    label: 'Сообщения',
    icon: new URL('../images/icons/auth.png', import.meta.url).href,
    value: 'dialogues'
  }
])

const emit = defineEmits(['select']);
</script>

<template>
  <div>
    <h1>NAv bar</h1>
    <nav class="navigation">
      <ul class="nav">
        <li v-for="item in navItems" class="nav__item" :key="item.label">
          <button @click="emit('select', item.value)" class="nav__button">
            <img :src="item.icon" alt="" class="nav__icon">
            <span class="nav__title"> {{ item.label }}</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.navigation {
  border: 2px white solid;
}

.nav {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav__button {
  width: 200px;
  padding: 8px 0 8px 10px;
  display: flex;
  gap: 7px;
  align-items: center;
  background: none;
  border: none;
  color: aliceblue;
  cursor: pointer;
  border-radius: 5px;
  outline: 1px grey solid;
}

.nav__button:hover {
  background-color: rgba(128, 128, 128, 0.4);
}

.nav__icon {
  width: 24px;
  height: 24px;
}
</style>
