<h1 align="center">p-modal</h1>
<p align="center">A modal state manager for Vue</p>

[![NPM](https://img.shields.io/npm/v/p-modal.svg)](https://www.npmjs.com/package/p-modal)
[![license](https://img.shields.io/npm/l/p-modal)](https://github.com/Brain777777/p-modal/blob/main/LICENSE)
[![Coverage Status](https://codecov.io/github/Brain777777/p-modal/graph/badge.svg)](https://codecov.io/github/Brain777777/p-modal)

## Install
```bash
npm install p-modal
```

## Usage
1. Embed ModalPlaceholder in the App.vue.
  ```vue
  <template>
    <ModalPlaceholder />
  </template>
  ```
2. Create a modal component
  ```vue
  <script setup lang="ts">
  import { Button, Modal } from 'ant-design-vue'
  import { PModalProps } from 'p-modal'

  defineProps<PModalProps>()

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
    <AModal
      :open="show"
      @update:open="onChange"
      @ok="confirm"
      @cancel="cancel"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </AModal>
  </template>
  ```
3. Use global API to open modal
  ```vue
  <script setup lang="ts">
  import { showModal } from 'p-modal'
  import MyModal from './MyModal.vue'

  const open = () => {
    showModal(MyModal)
  }
  </script>

  <template>
    <button @click="open">
      Show Modal
    </button>
  </template>
  ```

## Thanks

Thanks to [nice-modal-react](https://github.com/eBay/nice-modal-react) for providing a good idea.

## License
[MIT](LICENSE)  License © 2024 [Brain777777](https://github.com/Brain777777)
