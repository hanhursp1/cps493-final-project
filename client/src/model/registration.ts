import type { User } from "./users";

export interface Signup {
  info: User,
  username: string,
  password: string
}