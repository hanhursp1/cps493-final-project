import type { DataEnvelope } from "./transporttypes"

export const API_ROOT = import.meta.env.VITE_API_ROOT

export async function rest<T, R>(url: string, data?: T, method?: string): Promise<R> {
  const response = await fetch(url, {
    method: method ?? (data ? "POST": "GET"),
    headers: {
      "Content-type": "application/json"
    },
    body: data ? JSON.stringify(data) : undefined
  })
  return response.json()
}

export async function api<T, R>(action: string, data?: T, method?: string): Promise<DataEnvelope<R>> {
  return await rest(`${API_ROOT}/${action}`, data, method)
}

export async function apiGet<T>(action: string): Promise<DataEnvelope<T>> {
  return await api(action, undefined, "GET")
}

export async function apiPost<T, R>(action: string, data: T): Promise<DataEnvelope<R>> {
  return await api(action, data, "POST")
}

export async function apiDelete<T, R>(action: string, data?: T): Promise<DataEnvelope<R>> {
  return await api(action, data, "DELETE")
}