import { Command } from "lib/commands"

export function getArgs(command: Command) {
  return command[0]
    .split(" ")
    .filter(v => v.startsWith(":"))
    .map(s => s.replace(":", ""))
}
