<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import GameLibrary from './components/GameLibrary.vue';
import Roulette from './components/Roulette.vue';
import MyButton from './components/UI/MyButton.vue';
import Warning from './components/UI/Warning.vue';

const selectedGames = ref([]);
const rouletteRef = ref(null)
const showWarning = ref(false)

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
    console.log('!value')
  }, 3000)
}

</script>

<template>
  <div>
    <Header />
    <Warning v-if="showWarning" />
    <Roulette ref="rouletteRef" :selectedGames="selectedGames" @showWarning="handleShowWarning" />
    <MyButton @click="startRoulette">Крутить!</MyButton>
    <GameLibrary :selectedGames="selectedGames" @update-selected-games="updateSelectedGames" />
  </div>
</template>

<style scoped></style>
