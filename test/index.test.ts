import type { PropType } from 'vue'
import type { PModalProps } from '../src'
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/vue'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { hideModal, ModalPlaceholder, removeModal, showModal } from '../src'
import { getStore } from '../src/store'
import TestModal from './modal.vue'

function createModal(name: string) {
  return defineComponent({
    props: {
      show: Boolean,
      close: { type: Function as PropType<PModalProps['close']>, required: true },
      remove: { type: Function as PropType<PModalProps['remove']>, required: true },
    },
    setup(props) {
      return () => h('div', [
        h('span', `${name} ${props.show}`),
        h('button', { onClick: () => props.remove() }, `${name} remove`),
      ])
    },
  })
}

describe('modal', () => {
  beforeAll(() => {
    const { unmount } = render(ModalPlaceholder)
    return () => {
      unmount()
    }
  })

  it('show/hide modal by component with globally API', async () => {
    let body: HTMLElement
    showModal(TestModal)
    await nextTick()
    body = screen.getByText('Test Modal Body true')
    expect(body).toBeInTheDocument()

    hideModal(TestModal)
    await nextTick()
    body = screen.getByText('Test Modal Body false')
    expect(body).toBeInTheDocument()
  })

  it('remove modal by component with globally API', async () => {
    showModal(TestModal)
    await nextTick()
    expect(screen.queryByText('Test Modal Body true')).toBeInTheDocument()
    removeModal(TestModal)
    await waitForElementToBeRemoved(() => screen.queryByText('Test Modal Body true'))
  })

  it('change component state to change modal show/hide', async () => {
    showModal(TestModal)
    await nextTick()
    const button = screen.getByText('toggle')
    fireEvent.click(button)
    await nextTick()
    expect(screen.queryByText('Test Modal Body true')).not.toBeInTheDocument()
  })

  it('remove modal by component action', async () => {
    showModal(TestModal)
    await nextTick()
    const button = screen.getByText('remove')
    fireEvent.click(button)
    await waitForElementToBeRemoved(() => screen.queryByText('Test Modal Body true'))
  })

  it('should not throw error when modal is not registered', () => {
    expect(() => showModal(TestModal)).not.toThrow()
  })

  it('resolve promise when modal is closed', async () => {
    const result = showModal(TestModal, { count: 1 })
    await nextTick()
    const button = screen.getByText('ok')
    fireEvent.click(button)
    await expect(result).resolves.toBe(1)
  })

  it('reject promise when modal is closed', async () => {
    const result = showModal(TestModal)
    await nextTick()
    const button = screen.getByText('cancel')
    fireEvent.click(button)
    await expect(result).rejects.toThrow('cancel')
  })

  it('show the same modal again right after removing it', async () => {
    const Modal = createModal('A')
    showModal(Modal)
    await nextTick()
    removeModal(Modal)
    showModal(Modal)
    await nextTick()
    expect(screen.getByText('A true')).toBeInTheDocument()
    removeModal(Modal)
  })

  it('show another modal before removing one in the same tick', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const ModalB = createModal('B')
    const ModalC = createModal('C')
    showModal(ModalB)
    await nextTick()
    showModal(ModalC)
    removeModal(ModalB)
    await nextTick()
    expect(warn).not.toHaveBeenCalled()
    expect(screen.queryByText('B true')).not.toBeInTheDocument()
    expect(screen.getByText('C true')).toBeInTheDocument()
    removeModal(ModalC)
    warn.mockRestore()
  })

  it('ignore late close calls after the modal is removed', async () => {
    const Modal = createModal('D')
    showModal(Modal)
    await nextTick()
    const id = Object.keys(getStore()).at(-1)!
    const { close, onChange } = getStore()[id].props!
    fireEvent.click(screen.getByText('D remove'))
    await nextTick()
    close()
    onChange(false)
    await nextTick()
    expect(getStore()[id]).toBeUndefined()
  })
})

it('clear store after unmount', async () => {
  const { unmount } = render(ModalPlaceholder)
  unmount()
  await nextTick()
  expect(getStore()).toEqual({})
})
