export type Recordable<T = any> = Record<string, T>

export interface Value {
  show?: boolean
  props?: Recordable
  id: string
}

export interface InnerModalProps {
  confirm: (payload?: any) => void
  cancel: () => void
  close: () => void
  remove: () => void
  onChange: (value: boolean) => void
}

export interface PModalProps extends InnerModalProps {
  show: boolean
}
