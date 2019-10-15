import * as React from "react"
import { Command, commands } from "lib/commands"
import { limit } from "lib/limit"
import { match } from "lib/match"
import { extractParams } from 'lib/extract_params'
import { ComponentState, SetState, STATE } from "lib/states"
import { Dropdown } from "components/dropdown"
import { Input } from "components/input"

export const Editing = ({
  state,
  setState,
}: {
  state: ComponentState
  setState: SetState
}) => {
  if (state.type !== STATE.EDITING_QUERY) {
    return null
  }

  return (
    <>
      <Input
        autoFocus={true}
        value={state.query}
        onChange={e => {
          setState({
            type: STATE.EDITING_QUERY,
            query: e.target.value,
            commands: limit(match(e.target.value), 4),
          })
        }}
      />
      <Dropdown
        commands={state.commands}
        onClick={command => {
          setState({
            type: STATE.ADDING_ARGUMENTS,
            command,
            params: extractParams(command[0]),
          })
        }}
      />
    </>
  )
}
