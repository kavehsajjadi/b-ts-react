import { Command } from "lib/commands"

export const enum STATE {
  EDITING_QUERY = 1,
  ADDING_ARGUMENTS = 2,
  EXECUTING_COMMAND = 3,
  EXECUTED_COMMAND = 4,
}

export type ComponentState =
  | { type: STATE.EDITING_QUERY; query: string; commands: Command[] }
  | {
      type: STATE.ADDING_ARGUMENTS
      command: Command
      params: { [key: string]: string }
    }
  | { type: STATE.EXECUTING_COMMAND; command: Command }
  | { type: STATE.EXECUTED_COMMAND; message?: string }

export type SetState = (state: ComponentState) => void
