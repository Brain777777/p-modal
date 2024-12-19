import type { Recordable, Value } from './types'
import { nextTick, reactive } from 'vue'

const store = reactive<Recordable<Value>>({})

export const getStore = () => store

export const get = (id: string) => store[id]

export function set(id: string, props: Value) {
  store[id] = props
}

export function openModal(id: string, props?: Recordable) {
  return set(id, {
    show: true,
    id,
    props,
  })
}

export function setModal(id: string, show: boolean) {
  return set(id, {
    ...get(id),
    show,
  })
}

export function closeModal(id: string) {
  return set(id, {
    ...get(id),
    show: false,
    id,
  })
}

export function deleteModal(id: string) {
  nextTick(() => {
    delete store[id]
  })
}
