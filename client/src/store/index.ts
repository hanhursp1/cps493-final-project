import { reactive } from "vue"
import { type UserSession, type User } from "@/model/users"

export type StoreData = {
  user?: UserSession
  users: User[]
  usernameMap: Map<string, number>
}

const store = reactive<{
  state?: StoreData
}>({

})

export default store