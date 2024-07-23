<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import GameLibrary from './components/GameLibrary.vue';
import Roulette from './components/Roulette.vue';
import MyButton from './components/UI/MyButton.vue';

const selectedGames = ref([]);
const rouletteRef = ref(null)

function updateSelectedGames(newSelectedGames) {
  selectedGames.value = newSelectedGames;
}

function startRoulette() {
  if (rouletteRef.value) {
    rouletteRef.value.start()
  }
}

</script>

<template>
  <div>
    <Header />
    <Roulette ref="rouletteRef" :selectedGames="selectedGames" />
    <MyButton @click="startRoulette">Крутить!</MyButton>
    <GameLibrary :selectedGames="selectedGames" @update-selected-games="updateSelectedGames" />
  </div>
</template>

<style scoped></style>
