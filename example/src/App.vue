<script setup lang="ts">
import { ModalPlaceholder, showModal } from '../../src'
import TestModal from './components/modal.vue'
</script>

<template>
  <div>
    <button @click="showModal(TestModal)">
      Show Modal
    </button>
    <ModalPlaceholder />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
