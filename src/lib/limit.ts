export function limit(arr: any[], limit: number) {
  if (arr.length > limit) {
    return arr.slice(0, limit)
  }

  return arr
}
