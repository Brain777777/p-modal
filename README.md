<h1 align="center">p-modal</h1>

[![NPM](https://img.shields.io/npm/v/p-modal.svg)](https://www.npmjs.com/package/p-modal)
[![license](https://img.shields.io/npm/l/p-modal)](https://github.com/Brain777777/p-modal/blob/main/LICENSE)
[![Coverage Status](https://codecov.io/github/Brain777777/p-modal/graph/badge.svg)](https://codecov.io/github/Brain777777/p-modal)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/edit/vitejs-vite-me1aysrn?file=src%2FApp.vue)

[English](README.md) | [简体中文](README_zh.md)

This is a tool used in Vue, designed to manage modal boxes in Vue in an imperative manner. It utilizes global reactive to provide the state of modal boxes, allowing you to easily show or hide modal boxes through the modal component.

## Install
```bash
npm install p-modal
```

## Usage
1. Embed ModalPlaceholder in the App.vue.
  ```vue
  <script setup lang="ts">
  import { ModalPlaceholder } from 'p-modal'
  </script>

  <template>
    <ModalPlaceholder />
  </template>
  ```

> [!WARNING]
> When using Vue versions below 3.3, importing Props Types provided by p-modal will cause errors. To resolve this, please upgrade to Vue 3.3 or above, or refer to the following link
> https://github.com/vuejs/core/issues/4294#issuecomment-1316097560

2. Create a modal component
  ```vue
  <script setup lang="ts">
  import type { PModalProps } from 'p-modal'
  import { Modal } from 'ant-design-vue'

  const props = defineProps<PModalProps>()

  const confirm = () => {
    props.confirm()
    props.close()
  }

  const cancel = () => {
    props.cancel()
    props.close()
  }
  </script>

  <template>
    <Modal
      :open="show"
      @update:open="onChange"
      @ok="confirm"
      @cancel="cancel"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  </template>
  ```
3. Use global API to open modal
  ```vue
  <script setup lang="ts">
  import { showModal } from 'p-modal'
  import MyModal from './MyModal.vue'

  const handleOpen = () => {
    showModal(MyModal)
      .then((payload) => {
        // confirmed
      })
      .catch(() => {
        // cancelled
      })
  }
  </script>

  <template>
    <button @click="handleOpen">
      Open Modal
    </button>
  </template>
  ```

  > `showModal` returns a Promise: it resolves with the value passed to `confirm(payload)` and rejects with `Error('cancel')` when `cancel()` is called. Handle the rejection, otherwise cancelling produces an unhandled promise rejection.

## Thanks

Thanks to [nice-modal-react](https://github.com/eBay/nice-modal-react) for providing a good idea.

## License
[MIT](LICENSE)  License © 2024 [Brain777777](https://github.com/Brain777777)
