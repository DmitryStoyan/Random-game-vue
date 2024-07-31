<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="modal" @click.stop>
    <slot></slot>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
}
</style>
