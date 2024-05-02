export interface DataEnvelope<T> {
  data: T
  isSuccess: boolean
  message? :string
}

export interface Login {
  username: string
  password: string
}