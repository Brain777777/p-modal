<script setup lang="ts">
import { Button, Space } from 'ant-design-vue'
import { ref } from 'vue'
import { ModalPlaceholder, showModal } from '../../src'
import AntdModal from './components/antd-modal.vue'
import VantPopup from './components/vant-popup.vue'

const noop = () => {}

const count = ref(0)

const handleShowModal = () => {
  showModal(AntdModal, { count: 1 })
    .then((res) => {
      count.value = res
    })
    .catch(() => {
      count.value = 0
    })
}

const handleShowPopup = () => {
  showModal(VantPopup)
    .catch(noop)
}
</script>

<template>
  <div class="content">
    <div class="logo-wrapper">
      <img src="./assets/vue.svg" alt="logo" class="logo">
    </div>
    <Space>
      <Button @click="handleShowModal">
        Show Modal
      </Button>
      <Button @click="handleShowPopup">
        show Popup
      </Button>
    </Space>
    <div>result: {{ count }}</div>
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
