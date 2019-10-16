import * as React from "react"
import { Command, commands } from "lib/commands"
import { limit } from "lib/limit"
import { match } from "lib/match"
import {
  ComponentState,
  ErrorExecutingCommand as ErrorExecutingCommandType,
  SetState,
  STATE,
} from "lib/states"
import { Button } from "components/button"

export class ErrorExecutingCommand extends React.Component<{
  state: ErrorExecutingCommandType
  setState: SetState
}> {
  render() {
    const setEditing = () =>
      this.props.setState({
        type: STATE.EDITING_QUERY,
        query: "",
        commands: limit(match(""), 4),
      })
    return (
      <div>
        {this.props.state.message}
        <hr />
        <Button onClick={setEditing}>Done</Button>
      </div>
    )
  }
}
