<script setup lang="ts">
import { Button, Space } from 'ant-design-vue'
import { ModalPlaceholder, showModal } from '../../src'
import AntdModal from './components/antd-modal.vue'
import VantPopup from './components/vant-popup.vue'
</script>

<template>
  <div class="content">
    <div class="logo-wrapper">
      <img src="./assets/vue.svg" alt="logo" class="logo">
    </div>
    <Space>
      <Button @click="showModal(AntdModal)">
        Show Modal
      </Button>
      <Button @click="showModal(VantPopup)">
        show Popup
      </Button>
    </Space>
    <ModalPlaceholder />
  </div>
</template>

<style scoped>
.logo-wrapper {
  text-align: center;
}
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
