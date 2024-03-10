import { Sha256 } from '@aws-crypto/sha256-js'
import usernamemap from '@/data/usernamemap.json'
import store from '@/store';

// https://stackoverflow.com/a/34310051
function toHexString(byteArray: Uint8Array) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

export function hashPassword(password: string): string {
  const hash = new Sha256();
  hash.update(password)
  return toHexString(hash.digestSync())
}

// Gets the map of usernames to IDs. Meant as a debug for logging in.
export function getUsernameMap(): Map<string, number> {
  return new Map(Object.entries(usernamemap))
}

export enum LoginStatus {
  Ok = 0,
  InvalidUser,
  InvalidPassword
}

// Verify the user's login
export function login(username: string, password: string): LoginStatus {
  if (store.state) {
    let userID = store.state.usernameMap.get(username)
    if (userID === undefined) return LoginStatus.InvalidUser;
    let passHash = hashPassword(password)
    let correspondingUser = store.state.users[userID]
    // Password matches, Let the user login!
    if (correspondingUser.token === passHash) {
      store.state.user = {
        id: userID,
        token: passHash
      }
      return LoginStatus.Ok
    }
    return LoginStatus.InvalidPassword
  }
  throw new Error("InvalidStore")
}