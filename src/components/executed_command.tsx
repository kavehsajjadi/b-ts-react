import * as React from "react"
import { Command, commands } from "lib/commands"
import { limit } from "lib/limit"
import { match } from "lib/match"
import {
  ComponentState,
  ExecutedCommand as ExecutedCommandType,
  SetState,
  STATE,
} from "lib/states"
import { Button } from "components/button"

export class ExecutedCommand extends React.Component<{
  state: ExecutedCommandType
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
        <Button autoFocus={true} onClick={setEditing}>
          Done
        </Button>
      </div>
    )
  }
}
