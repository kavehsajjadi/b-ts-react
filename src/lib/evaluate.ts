import { Command } from "lib/commands"

export function evaluate(command: Command, query: string) {
  const fn = command[1]
  const commandParts = command[0].split(" ")
  const queryParts = query.split(" ")

  const args = {}
  queryParts.forEach((queryPart, index) => {
    const cp = commandParts[index]
    if (cp.startsWith(":")) {
      args[cp.slice(1, cp.length + 1)] = queryPart
    }
  })

  fn(args)
}
