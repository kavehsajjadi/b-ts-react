import * as React from "react"
import { limit } from "lib/limit"
import { match } from "lib/match"
import { ComponentState, SetState, STATE } from "lib/states"
import { Button } from "components/button"
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
  const handleArgUpdate = key => e => {
    const p = { ...params, [key]: e.target.value }
    setState({ type: STATE.ADDING_ARGUMENTS, command, params: p })
  }
  const handleQueryChange = e => {
    setState({
      type: STATE.EDITING_QUERY,
      query: e.target.value,
      commands: limit(match(e.target.value), 4),
    })
  }
  const setExecuting = () => {
    setState({ type: STATE.EXECUTING_COMMAND, command, params })
  }

  return (
    <>
      <Input autoFocus={true} value={command[0]} onChange={handleQueryChange} />
      {keys.map(key => (
        <ArgumentInput
          key={key}
          value={params[key]}
          label={key}
          onChange={handleArgUpdate(key)}
        />
      ))}
      <Button onClick={setExecuting}>Evaluate</Button>
    </>
  )
}

const ArgumentInput = ({ label, onChange, value }) => (
  <div key={label}>
    <Input
      value={value}
      placeholder={`Enter a value for ${label}`}
      onChange={onChange}
    />
  </div>
)
