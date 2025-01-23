import type { Component } from 'vue'
import type { ComponentProps, ExcludePropsKeys, InnerModalProps, Parameter, Recordable } from './types'
import { computed, defineComponent, Fragment, h, onUnmounted } from 'vue'
import { clearStore, closeModal, deleteModal, get, getStore, openModal, setModal } from './store'
import { getModalID } from './utils'

const MODAL_REGISTRY: Recordable<{
  comp: Component
}> = {}

function createModalWrapper(component: Component) {
  const Wrapper = defineComponent({
    props: ['id'],
    setup(props) {
      const state = computed(() => get(props.id))
      return () => h(component, {
        show: state.value?.show,
        ...state.value?.props,
      })
    },
  })
  return Wrapper
}

export const ModalPlaceholder = defineComponent({
  setup() {
    const state = getStore()
    const comps = computed(() => Object.keys(state).map(id => ({ ...MODAL_REGISTRY[id], id })))
    onUnmounted(() => {
      clearStore()
    })
    return () => h(Fragment, null, comps.value.map(t => h(t.comp, {
      key: t.id,
      id: t.id,
    })))
  },
})

function register(component: Component) {
  const modalID = getModalID(component)
  if (!MODAL_REGISTRY[modalID]) {
    MODAL_REGISTRY[modalID] = {
      comp: createModalWrapper(component),
    }
  }
}

function unregister(modalID: string) {
  delete MODAL_REGISTRY[modalID]
}

export function showModal<T extends Component>(component: T, props?: Omit<ComponentProps<T>, ExcludePropsKeys>) {
  return new Promise<Parameter<ComponentProps<T>['confirm']>>((resolve, reject) => {
    const modalID = getModalID(component)
    if (!MODAL_REGISTRY[modalID]) {
      register(component)
    }
    const handler: InnerModalProps = {
      confirm: payload => resolve(payload),
      cancel: () => reject(new Error('cancel')),
      close: () => closeModal(modalID),
      onChange: show => setModal(modalID, show),
      remove: () => {
        deleteModal(modalID)
        unregister(modalID)
      },
    }
    openModal(modalID, { ...(props as object), ...handler })
  })
}

export function hideModal(component: Component) {
  const modalID = getModalID(component)
  if (MODAL_REGISTRY[modalID]) {
    closeModal(modalID)
  }
}

export function removeModal(component: Component) {
  const modalID = getModalID(component)
  if (MODAL_REGISTRY[modalID]) {
    deleteModal(modalID)
    unregister(modalID)
  }
}
