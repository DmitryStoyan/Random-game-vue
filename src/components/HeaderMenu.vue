<script setup>

</script>

<template>
  <div class="header-menu">
    <button class="game-selection__close-button"></button>
    <h3 class="game-selection__title">Библиотека игр</h3>
    <img class="header-menu__logo" src="../images/random-icon_white.png" alt="" />
  </div>
</template>

<style scoped>
.header-menu {
  display: flex;
  justify-content: space-between;
  background-color: #13161a;
  padding: 2rem 1rem;
  /* position: fixed; */
  /* z-index: 5; */
}

.game-selection__close-button {
  background-image: url(@/images/back-button_white.png);
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 4rem;
  height: 4rem;
  border: none;
  cursor: pointer;
}

.game-selection__title {
  font-size: 3rem;
}

.header-menu__logo {
  width: 4rem;
  height: 4rem;
}
</style>
