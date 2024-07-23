<script setup>

</script>


<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style>
.btn {
  align-self: center;
  padding: 1rem 3rem;
  background: #67aeff;
  color: white;
  font-size: 1.6rem;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.btn:hover {
  opacity: 0.8;
}

.btn_disabled {
  opacity: 0.3;
}

.btn:hover.btn_disabled {
  opacity: 0.3;
}
</style>
