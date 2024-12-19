import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/vue'
import { expect, it } from 'vitest'
import { nextTick } from 'vue'
import { hideModal, ModalPlaceholder, removeModal, showModal } from '../src'
import TestModal from './modal.vue'

it('show/hide modal by component with globally API', async () => {
  const { unmount } = render(ModalPlaceholder)
  let body: HTMLElement
  showModal(TestModal, { count: 1 })
  await nextTick()
  body = screen.getByText('Test Modal Body true')
  expect(body).toBeInTheDocument()

  hideModal(TestModal)
  await nextTick()
  body = screen.getByText('Test Modal Body false')
  expect(body).toBeInTheDocument()
  unmount()
})

it('remove modal by component with globally API', async () => {
  const { unmount } = render(ModalPlaceholder)
  showModal(TestModal, { count: 1 })
  await nextTick()
  expect(screen.queryByText('Test Modal Body true')).toBeInTheDocument()
  removeModal(TestModal)
  await nextTick()
  await waitForElementToBeRemoved(() => screen.queryByText('Test Modal Body true'))
  unmount()
})

it('resolve promise when modal is closed', async () => {
  const { unmount } = render(ModalPlaceholder)
  showModal(TestModal, { count: 1 }).then((data) => {
    expect(data).toBe(1)
  })
  await nextTick()
  const button = screen.getByText('ok')
  fireEvent.click(button)
  unmount()
})
