import * as React from "react"
import { limit } from "lib/limit"
import { match } from "lib/match"
import { ComponentState, SetState, STATE } from "lib/states"
import { Input } from "components/input"

export const AddingArguments = ({
  state,
  setState,
}: {
  state: ComponentState
  setState: SetState
}) => {
  if (state.type !== STATE.ADDING_ARGUMENTS) {
    return null
  }

  const { type, command, params } = state
  const keys = Object.keys(params)

  return (
    <>
      <Input
        autoFocus={true}
        value={command[0]}
        onChange={e => {
          setState({
            type: STATE.EDITING_QUERY,
            query: e.target.value,
            commands: limit(match(e.target.value), 4),
          })
        }}
      />
      {keys.map(key => {
        return (
          <div key={key}>
            {key}
            <Input
              value={params[key]}
              onChange={e => {
                const newParams = {
                  ...params,
                  [key]: e.target.value,
                }
                setState({
                  type: STATE.ADDING_ARGUMENTS,
                  command,
                  params: newParams,
                })
              }}
            />
          </div>
        )
      })}
      <button type="button" onClick={() => {}}>Evaluate</button>
    </>
  )
}
