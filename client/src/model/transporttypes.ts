export interface DataEnvelope<T> {
  data: T
  isSuccess: boolean
  message? :string
}