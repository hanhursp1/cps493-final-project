import { getUsersRaw } from "./users";
import { getUsernameMap } from "./password";
import { getPostsRaw, getRepliesRaw } from "./posts";
import type { StoreData } from "@/store";
import { getActivitiesRaw } from "./activities";
import { ref } from "vue";

// Returns default store with initialized data.
export async function initStore(): Promise<StoreData> {
  return {
    users: await getUsersRaw(),
    // usernameMap: getUsernameMap(),
    posts: await getPostsRaw(),
    replies: await getRepliesRaw(),
    activities: await getActivitiesRaw()
  }
}