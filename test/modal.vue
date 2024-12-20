<script setup lang="ts">
import type { PModalProps } from '../src/types'

const props = defineProps<PModalProps & { count?: number }>()

function ok() {
  props.confirm(props.count)
  props.close()
}
function cancel() {
  props.cancel()
  props.close()
}
const toggle = () => {
  props.onChange(!props.show)
}

const remove = () => {
  props.remove()
}
</script>

<template>
  <div>Test Modal Body {{ show }}</div>
  <button @click="ok">
    ok
  </button>
  <button @click="cancel">
    cancel
  </button>
  <button @click="toggle">
    toggle
  </button>
  <button @click="remove">
    remove
  </button>
</template>
