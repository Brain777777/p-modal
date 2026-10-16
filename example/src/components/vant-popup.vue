<script setup lang="ts">
import type { PModalProps } from '../../../src'
import { Button, Popup } from 'vant'

const props = defineProps<PModalProps>()

function confirm() {
  props.confirm()
  props.close()
}

function cancel() {
  props.cancel()
  props.close()
}
</script>

<template>
  <Popup
    :show="show"
    position="bottom"
    :style="{ height: '30%' }"
    @update:show="onChange"
  >
    <Button @click="confirm">
      confirm
    </Button>
    <Button @click="cancel">
      cancel
    </Button>
  </Popup>
</template>
