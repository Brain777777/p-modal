# p-modal

using imperative management of modals in Vue

## Installation

```bash
# with npm
npm install p-modal

# with yarn
yarn add p-modal

# with pnpm
pnpm add p-modal
```

## Usage

1. Embed ModalPlaceholder in the entry file.
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
    <button @click="showModal(TestModal)">
      Show Modal
    </button>
  </template>
  ```

## Thanks

Thanks to [nice-modal-react](https://github.com/eBay/nice-modal-react) for providing a good idea.

## License

This project is licensed under the [MIT License](LICENSE).
