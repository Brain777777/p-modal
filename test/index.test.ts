import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/vue'
import { beforeAll, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { hideModal, ModalPlaceholder, removeModal, showModal } from '../src'
import { getStore } from '../src/store'
import TestModal from './modal.vue'

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
    showModal(TestModal, { count: 1 }).then((data) => {
      expect(data).toBe(1)
    })
    await nextTick()
    const button = screen.getByText('ok')
    fireEvent.click(button)
  })

  it('reject promise when modal is closed', async () => {
    showModal(TestModal).catch((e) => {
      expect(e).toBeInstanceOf(Error)
    })
    await nextTick()
    const button = screen.getByText('cancel')
    fireEvent.click(button)
  })
})

it('clear store after unmount', async () => {
  const { unmount } = render(ModalPlaceholder)
  unmount()
  await nextTick()
  expect(getStore()).toEqual({})
})
