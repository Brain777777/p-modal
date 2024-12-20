import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/vue'
import { expect, it } from 'vitest'
import { nextTick } from 'vue'
import { hideModal, ModalPlaceholder, removeModal, showModal } from '../src'
import TestModal from './modal.vue'

it('show/hide modal by component with globally API', async () => {
  const { unmount } = render(ModalPlaceholder)
  let body: HTMLElement
  showModal(TestModal)
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
  showModal(TestModal)
  await nextTick()
  expect(screen.queryByText('Test Modal Body true')).toBeInTheDocument()
  removeModal(TestModal)
  await nextTick()
  await waitForElementToBeRemoved(() => screen.queryByText('Test Modal Body true'))
  unmount()
})

it('toggle modal', async () => {
  const { unmount } = render(ModalPlaceholder)
  showModal(TestModal)
  await nextTick()
  const button = screen.getByText('toggle')
  fireEvent.click(button)
  await nextTick()
  expect(screen.queryByText('Test Modal Body true')).not.toBeInTheDocument()
  unmount()
})

it('should not throw error when modal is not registered', () => {
  expect(() => showModal(TestModal)).not.toThrow()
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

it('reject promise when modal is closed', async () => {
  const { unmount } = render(ModalPlaceholder)
  showModal(TestModal).catch((e) => {
    expect(e).toBeInstanceOf(Error)
  })
  await nextTick()
  const button = screen.getByText('cancel')
  fireEvent.click(button)
  unmount()
})
