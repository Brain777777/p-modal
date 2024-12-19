<script setup lang="ts">
import type { PModalProps } from '../src/types'

const props = defineProps<PModalProps & { count: number }>()

function ok() {
  props.confirm(props.count)
  props.close()
}
function cancel() {
  props.cancel()
  props.close()
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
</template>
