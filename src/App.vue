<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/store/userStore';

import Header from './components/Header.vue';
import GameLibrary from './components/GameLibrary.vue';
import Roulette from './components/Roulette.vue';
import MyButton from './components/UI/MyButton.vue';
import Warning from './components/UI/Warning.vue';


const userStore = useUserStore();
const selectedGames = ref([]);
const rouletteRef = ref(null)
const showWarning = ref(false)
const isLibraryOpen = ref(false)

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      userStore.userId = user.uid
    } else {
      userStore.userId = ''
    }
  })
})

function updateSelectedGames(newSelectedGames) {
  selectedGames.value = newSelectedGames;
}

function startRoulette() {
  if (rouletteRef.value) {
    rouletteRef.value.start()
  }
}

function handleShowWarning(value) {
  showWarning.value = value
  setTimeout(() => {
    showWarning.value = false
  }, 3000)
}

function libraryOpened() {
  isLibraryOpen.value = true
}

function libraryClosed() {
  isLibraryOpen.value = false
}

</script>

<template>
  <div>
    <GameLibrary v-if="isLibraryOpen" @close="libraryClosed" :selectedGames="selectedGames"
      @update-selected-games="updateSelectedGames" />
    <Warning v-if="showWarning" />
    <Header />
    <router-view />
    <Roulette ref="rouletteRef" :selectedGames="selectedGames" @showWarning="handleShowWarning" />
    <div class="buttons-wrapper">
      <MyButton @click="startRoulette">Крутить!</MyButton>
      <MyButton @click="libraryOpened">Библиотека игр</MyButton>
    </div>
  </div>
</template>

<style scoped>
.buttons-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0 0 0;
}
</style>
