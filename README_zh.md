<h1 align="center">p-modal</h1>

[![NPM](https://img.shields.io/npm/v/p-modal.svg)](https://www.npmjs.com/package/p-modal)
[![license](https://img.shields.io/npm/l/p-modal)](https://github.com/Brain777777/p-modal/blob/main/LICENSE)
[![Coverage Status](https://codecov.io/github/Brain777777/p-modal/graph/badge.svg)](https://codecov.io/github/Brain777777/p-modal)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/edit/vitejs-vite-me1aysrn?file=src%2FApp.vue)

[简体中文](README_zh.md) | [English](README.md)

使用命令式管理 Modal 组件，采用 Reactive 来提供 Modal 的状态，让你能够使用命令式轻松控制 Modal 组件的显示或隐藏

## 安装
```bash
npm install p-modal
```

## 使用方法
1. 在 App.vue 中使用 ModalPlaceholder。
  ```vue
  <template>
    <ModalPlaceholder />
  </template>
  ```

> [!WARNING]
> 当使用 Vue 3.3 以下版本时，导入 p-modal 提供的 Props Types 会导致错误。要解决此问题，请升级到 Vue 3.3 或以上版本，或参考以下链接：
> https://github.com/vuejs/core/issues/4294#issuecomment-1316097560

2. 创建一个 Modal 组件
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
    <Modal
      :open="show"
      @update:open="onChange"
      @ok="confirm"
      @cancel="cancel"
    >
      <p>一些内容...</p>
      <p>一些内容...</p>
      <p>一些内容...</p>
    </Modal>
  </template>
  ```
3. 使用全局 API 打开 Modal
  ```vue
  <script setup lang="ts">
  import { showModal } from 'p-modal'
  import MyModal from './MyModal.vue'

  const handleOpen = () => {
    showModal(MyModal)
  }
  </script>

  <template>
    <button @click="handleOpen">
      Open Modal
    </button>
  </template>
  ```

## 致谢

感谢 [nice-modal-react](https://github.com/eBay/nice-modal-react) 提供了很好的想法。

## License
[MIT](LICENSE) License © 2024 [Brain777777](https://github.com/Brain777777)
