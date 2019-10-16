import * as React from "react"
import { Command } from "lib/commands"
import {
  ComponentState,
  ExecutingCommand as ExecutingCommandType,
  SetState,
  STATE,
} from "lib/states"

export class ExecutingCommand extends React.Component<{
  state: ExecutingCommandType
  setState: SetState
}> {
  async componentDidMount() {
    const { setState, state } = this.props
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
        message: e,
      })
    }
  }

  render() {
    return <div>Executing your command :D </div>
  }
}
