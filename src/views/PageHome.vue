<script setup>
import Header from '@/components/Header.vue'
import Roulette from '@/components/Roulette.vue'
</script>

<template>
  <div>
    <Roulette ref="rouletteRef" :selectedGames="selectedGames" />

  </div>
</template>

<style scoped></style>
