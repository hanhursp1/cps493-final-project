import { getUsersRaw } from "./users";
import { getUsernameMap } from "./password";
import { getPostsRaw, getRepliesRaw } from "./posts";
import type { StoreData } from "@/store";

// Returns default store with initialized data.
export function initStore(): StoreData {
  return {
    users: getUsersRaw(),
    usernameMap: getUsernameMap(),
    posts: getPostsRaw(),
    replies: getRepliesRaw()
  }
}