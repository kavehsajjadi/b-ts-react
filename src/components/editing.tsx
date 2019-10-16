import * as React from "react"
import { Command, commands } from "lib/commands"
import { limit } from "lib/limit"
import { match } from "lib/match"
import { extractParams } from "lib/extract_params"
import { EditingQuery, SetState, STATE } from "lib/states"
import { Dropdown } from "components/dropdown"
import { Input } from "components/input"

export const Editing = ({
  state,
  setState,
}: {
  state: EditingQuery
  setState: SetState
}) => {
  const handleQueryUpdate = e => {
    setState({
      type: STATE.EDITING_QUERY,
      query: e.target.value,
      commands: limit(match(e.target.value), 4),
    })
  }

  const handleCommandClick = command => {
    setState({
      type: STATE.ADDING_ARGUMENTS,
      command,
      params: extractParams(command[0]),
    })
  }

  return (
    <>
      <Input
        autoFocus={true}
        value={state.query}
        placeholder="What would you like to do?"
        onChange={handleQueryUpdate}
      />
      <Dropdown commands={state.commands} onClick={handleCommandClick} />
    </>
  )
}
