<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import GameLibrary from './components/GameLibrary.vue';
import Roulette from './components/Roulette.vue';

const selectedGames = ref([]);

function updateSelectedGames(newSelectedGames) {
  selectedGames.value = newSelectedGames;
}
</script>

<template>
  <div>
    <Header />
    <Roulette :selectedGames="selectedGames" />
    <GameLibrary :selectedGames="selectedGames" @update-selected-games="updateSelectedGames" />
  </div>
</template>

<style scoped></style>
