<script setup>
import { ref, computed } from 'vue';
import DownloadMenu from './DownloadMenu.vue';
import { useUserStore } from '@/store/userStore';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';


const userStore = useUserStore();
const router = useRouter()

const isOpened = ref(false);

const items = computed(() => [
  {
    label: 'Авторизация',
    icon: new URL('../images/icons/auth.png', import.meta.url).href,
    path: '/auth',
    show: !userStore.userId,
  },
  {
    label: 'Библиотека игр',
    icon: new URL('../images/icons/library.png', import.meta.url).href,
    path: '/library',
    show: !!userStore.userId,
  },
  {
    label: 'Поиск тиммейтов',
    icon: new URL('../images/icons/teammate.png', import.meta.url).href,
    path: '/teammate',
    show: !!userStore.userId,
  },
  {
    label: 'Скачать приложение',
    icon: new URL('../images/icons/download.png', import.meta.url).href,
    path: '/download',
    show: !!userStore.userId,
  },
]);

const signOutMethod = async () => {
  await signOut(getAuth())
  router.push('/auth')
}

function toggleMenu() {
  isOpened.value = !isOpened.value;
}
</script>

<template>
  <header class="header">
    <a class="header__logo" href="#">Random Game</a>
    <ul class="header__navigation">
      <li v-for="item in items" :key="item.label" class="header__navigation-item">
        <span v-if="item.show">
          <img :src="item.icon" alt="icon" class="header__navigation-icon" />
          <button class="header__navigation-button">
            {{ item.label }}
          </button>
        </span>
      </li>
    </ul>
    <span v-if="userStore.userId" @click="signOutMethod" class="header__buttonwrapper">
      <img src="../images/icons/exit.png" alt="icon" class="header__navigation-icon" />
      <button class="header__navigation-button">Выход</button>
    </span>
    <DownloadMenu v-if="isOpened" @closeMenu="toggleMenu" />
  </header>
</template>

<style scoped>
.header {
  padding: 4rem 0 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  font-family: "DancingScript-Regular", serif;
  font-size: 2rem;
  font-weight: 900;
  color: aliceblue;
  text-decoration: none;
}

.header__navigation {
  display: flex;
  list-style-type: none;
  gap: 2rem;
}

.header__navigation-item {
  display: flex;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
}

.header__navigation-item:hover {
  opacity: 0.7;
}

.header__navigation-icon {
  width: 24px;
  height: 24px;
  margin-right: 0.1rem;
  cursor: pointer;
}

.header__navigation-button {
  color: white;
  border: none;
  background: none;
  cursor: pointer;
}

.header-menu__button {
  background: url(../images/random-icon_white.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 5.5rem;
  height: 5.5rem;
  border: none;
  cursor: pointer;
}

.buttons-wrapper {
  display: flex;
  align-items: center;
}

.popup_opened {
  opacity: 1;
  visibility: visible;
}
</style>
