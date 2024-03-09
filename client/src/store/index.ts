import { reactive } from "vue"
import { type UserSession } from "@/model/users"

type StoreData = {
  user?: UserSession
}

const store = reactive<StoreData>({
  
})

export default store