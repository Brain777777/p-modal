import type { Component } from 'vue'

let uniqueID = 0
const getUniqueID = () => `p-modal-${uniqueID++}`
const modalFlag = Symbol('p-modal')
type ModalComponent = Component & { [modalFlag]?: string }

export function getModalID(modal: ModalComponent): string {
  if (!modal[modalFlag]) {
    modal[modalFlag] = getUniqueID()
  }
  return modal[modalFlag]!
}
