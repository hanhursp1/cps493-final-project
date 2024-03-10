import { getUsers, getUsernameMap } from "./users";
import type { StoreData } from "@/store";

export function initStore(): StoreData {
  return {
    users: getUsers(),
    usernameMap: getUsernameMap()
  }
}