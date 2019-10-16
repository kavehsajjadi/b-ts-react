import * as React from "react"
import { Command } from "lib/commands"
import {
  ComponentState,
  ExecutedCommand as ExecutedCommandType,
  SetState,
  STATE,
} from "lib/states"

function isExecutedCommand(
  state: ComponentState,
): state is ExecutedCommandType {
  return state.type === STATE.EXECUTED_COMMAND
}

export class ExecutedCommand extends React.Component<{
  state: ComponentState
  setState: SetState
}> {
  render() {
    const state = this.props.state

    if (isExecutedCommand(state)) {
      const { message } = state
      return <div>{message}</div>
    }

    return null
  }
}
