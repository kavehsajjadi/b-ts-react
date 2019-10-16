import * as React from "react"
import { Command } from "lib/commands"
import {
  ComponentState,
  ExecutingCommand as ExecutingCommandType,
  SetState,
  STATE,
} from "lib/states"

function isExecutingCommand(
  state: ComponentState,
): state is ExecutingCommandType {
  return state.type === STATE.EXECUTING_COMMAND
}

export class ExecutingCommand extends React.Component<{
  state: ComponentState
  setState: SetState
}> {
  async componentDidMount() {
    const { setState, state } = this.props
    if (isExecutingCommand(state)) {
      const { command, params } = state

      try {
        const message = await command[1](params)

        setState({
          type: STATE.EXECUTED_COMMAND,
          message,
        })
      } catch (e) {
        setState({
          type: STATE.ERROR_EXECUTING_COMMAND,
          message: e.message,
        })
      }
    }
  }

  render() {
    return <div>Executing your command :D </div>
  }
}
