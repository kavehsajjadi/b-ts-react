import * as React from "react"
import { Command } from "lib/commands"
import {
  ComponentState,
  ErrorExecutingCommand as ErrorExecutingCommandType,
  SetState,
  STATE,
} from "lib/states"

function isErrorExecutingCommand(
  state: ComponentState,
): state is ErrorExecutingCommandType {
  return state.type === STATE.ERROR_EXECUTING_COMMAND
}

export class ErrorExecutingCommand extends React.Component<{
  state: ComponentState
  setState: SetState
}> {
  render() {
    const state = this.props.state

    if (isErrorExecutingCommand(state)) {
      const { message } = state
      return <div>Error: {message}</div>
    }

    return null
  }
}
