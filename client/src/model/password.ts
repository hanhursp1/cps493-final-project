import { Sha256 } from '@aws-crypto/sha256-js'

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