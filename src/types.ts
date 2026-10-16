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

export type ModalProps<T> = Omit<ComponentProps<T>, ExcludePropsKeys>

// eslint-disable-next-line ts/no-empty-object-type -- `{}` is what an all-optional Pick accepts
type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T]

/** `props` becomes a required argument when the modal declares required props. */
export type ShowModalArgs<T> = [RequiredKeys<ModalProps<T>>] extends [never]
  ? [props?: ModalProps<T>]
  : [props: ModalProps<T>]
