import { Command, commands } from 'lib/commands';

export function match(q: string) {
  const a = performance.now()
  const queryParts = q.split(" ")

  const filteredCommands = commands.filter(([command, fn]) => {
    const commandParts = command.split(" ")

    // if our query is longer than the command drop it
    if (queryParts.length > commandParts.length) {
      return false
    }

    for (let i = 0; i < queryParts.length; i++) {
      const qp = queryParts[i]
      const cp = commandParts[i]

      if (cp.startsWith(":")) {
        // if the query part we're checking matches a param its always true
        return true
      } else {
        // otherwise the query part needs to exactly match the command part
        return cp.includes(qp)
      }
    }
  })

  if (filteredCommands.length === commands.length && q.length < 2) return []

  filteredCommands.sort((a, b) => {
    return b[0].length - a[0].length
  })

  console.log("Time: ", performance.now() - a)
  return filteredCommands
}
