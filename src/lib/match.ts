import { Command, commands } from "lib/commands"
import * as lunr from "lunr"

const commandMap = new Map()

const index = lunr(function() {
  this.field("id")
  commands.forEach(command => {
    commandMap.set(command[0], command)
    this.add({ id: command[0] })
  })
})

export function match(query: string): Command[] {
  if (query.length < 3) return []
  const newQuery = query.replace(":", "")
  return index.search(`${newQuery}~5`).map(result => commandMap.get(result.ref))
}
