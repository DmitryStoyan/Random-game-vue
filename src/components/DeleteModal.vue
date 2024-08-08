<script setup>
const emit = defineEmits(['cancel', 'confirm'])
</script>

<template>
  <div class="delete-modal">
    <h2 class="title">Вы хотите удалить запрос?</h2>
    <button class="button cancel" @click="emit('cancel')">Отмена</button>
    <button class="button delete" @click="emit('confirm')">Удалить</button>
  </div>
</template>

<style scoped>
.delete-modal {
  position: fixed;
  top: 40%;
  left: auto;
  z-index: 12;
  background-color: wheat;
  padding: 1rem;
  border-radius: 10px;
  outline: 1px black solid;
}
</style>
