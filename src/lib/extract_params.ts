export function extractParams(s: string) {
  const regexp = /\:\w+/g
  const matches = Array.from(s.matchAll(regexp))

  const params = {}
  matches.forEach(([match, index, input, groups]) => {
    params[match.slice(1, match.length + 1)] = ''
  })
  return params
}
