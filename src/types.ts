export type Recordable<T = any> = Record<string, T>

export interface Value {
  show?: boolean
  props?: Recordable
  id: string
}

export interface InnerModalProps<T = any> {
  confirm: (payload?: T) => void
  cancel: () => void
  close: () => void
  remove: () => void
  onChange: (value: boolean) => void
}

export type ExcludePropsKeys = keyof InnerModalProps | 'show'

export interface PModalProps<T = any> extends InnerModalProps<T> {
  show: boolean
}

export type Parameter<T extends (...args: any) => any> = T extends (arg: infer P) => any ? NonNullable<P> : unknown

export type ComponentProps<T> =
T extends new () => { $props: infer P } ? NonNullable<P> :
  T extends (props: infer P, ...args: any) => any ? P : object
