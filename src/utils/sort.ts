export function sortToHigh(a: number, b: number) {
  if (a < b) {
    return -1
  }
  return 1
}

export function sortToLow(a: number, b: number) {
  if (a > b) {
    return -1
  }
  return 1
}
