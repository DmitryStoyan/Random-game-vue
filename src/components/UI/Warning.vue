<script setup>

</script>

<template>
  <div class="warning">
    <div class="warning__wrapper">
      <img class="warning__img" src="../../images/warning.png" alt="!" />
      <p class="warning__text">Выберите хотя бы 2 игры</p>
    </div>
  </div>
</template>

<style scoped>
.warning {
  position: fixed;
  z-index: 3;
  width: max-content;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  /* visibility: hidden;
  opacity: 0; */
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

.warning__wrapper {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
}

.warning__img {
  width: 3rem;
}

.warning__text {
  font-size: 2rem;
  padding: 0 0 0 1rem;
  color: #f2f2f2;
}
</style>
