import type { PropType } from 'vue'
import type { PModalProps } from '../src'
import { expectTypeOf } from 'vitest'
import { defineComponent } from 'vue'
import { showModal } from '../src'
import TestModal from './modal.vue'

// Type-level assertions checked by `pnpm typecheck`; this file is never executed.

const WithRequiredProp = defineComponent({
  props: {
    show: Boolean,
    confirm: { type: Function as PropType<PModalProps<number>['confirm']>, required: true },
    count: { type: Number, required: true },
  },
})

// `props` is optional when the modal has no required props of its own
showModal(TestModal)
showModal(TestModal, { count: 1 })

// ...and required when it does
showModal(WithRequiredProp, { count: 1 })
// @ts-expect-error `count` is required
showModal(WithRequiredProp)
// @ts-expect-error `count` must be a number
showModal(WithRequiredProp, { count: '1' })

// the resolved value is inferred from `confirm`
expectTypeOf(showModal(WithRequiredProp, { count: 1 })).resolves.toEqualTypeOf<number>()
