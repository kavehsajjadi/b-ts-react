import * as React from "react"
import { Command, commands } from "lib/commands"
import { ComponentState, SetState, STATE } from "lib/states"
import { getArgs } from "lib/get_arguments"
import { evaluate } from "lib/evaluate"
import { Editing } from "components/editing"
import { AddingArguments } from "components/adding_arguments"
import { ExecutingCommand } from "components/executing_command"
import { ExecutedCommand } from "components/executed_command"
import { ErrorExecutingCommand } from "components/error_executing_command"

export const CommandInput = ({
  initialState = editingState,
  initialCommand = noCommand,
  initialQuery = "",
}: {
  initialState?: ComponentState
  initialCommand?: Command
  initialQuery?: string
}) => {
  const [state, setState] = React.useState<ComponentState>(initialState)
  const updateState = (state: ComponentState) => setState(state)

  switch (state.type) {
    case STATE.EDITING_QUERY:
      return <Editing state={state} setState={updateState} />
    case STATE.ADDING_ARGUMENTS:
      return <AddingArguments state={state} setState={updateState} />
    case STATE.EXECUTING_COMMAND:
      return <ExecutingCommand state={state} setState={updateState} />
    case STATE.EXECUTED_COMMAND:
      return <ExecutedCommand state={state} setState={updateState} />
    case STATE.ERROR_EXECUTING_COMMAND:
      return <ErrorExecutingCommand state={state} setState={updateState} />
    default:
      throw new Error(`Define a case for state: ${state}`)
  }
}

const noCommand: Command = ["", () => undefined]

const editingState: ComponentState = {
  type: STATE.EDITING_QUERY,
  query: "",
  commands: [],
}

