<script setup lang="ts">
import type { PModalProps } from '../../../src'
import { Modal } from 'ant-design-vue'

const props = defineProps<PModalProps<number> & { count: number }>()

function confirm() {
  props.confirm(props.count)
  props.close()
}

function cancel() {
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
