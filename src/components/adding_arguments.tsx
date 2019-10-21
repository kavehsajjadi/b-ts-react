import * as React from "react"
import { limit } from "lib/limit"
import { match } from "lib/match"
import { ComponentState, SetState, STATE } from "lib/states"
import { Button } from "components/button"
import { Input } from "components/input"

type ArgumentRef = React.RefObject<ArgumentInput>

export class AddingArguments extends React.Component<{
  state: ComponentState
  setState: SetState
}> {
  focus = 0
  argumentRefs: ArgumentRef[] = []

  addRef = (index: number) => {
    const ref: ArgumentRef = React.createRef<ArgumentInput>()
    if (this.argumentRefs[index] == null) {
      this.argumentRefs[index] = ref
    }
    return ref
  }

  clickHandler = () => {
      // on click, based on count do a focus
  }

  render() {
    const { state, setState } = this.props

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
        <Input value={command[0]} onChange={handleQueryChange} />
        {keys.map((key, index) => (
          <ArgumentInput
            ref={this.addRef(index)}
            key={key}
            value={params[key]}
            label={key}
            onChange={handleArgUpdate(key)}
            autoFocus={index === 0}
          />
        ))}
        <Button onClick={setExecuting}>Evaluate</Button>
      </>
    )
  }
}

type ArgumentInputProps = {
  autoFocus?: boolean
  label: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  value: string
}
class ArgumentInput extends React.Component<ArgumentInputProps> {
  inputRef = React.createRef<Input>()

  focus() {
    if (this.inputRef != null) {
      this.inputRef.current.focus()
    }
  }

  render() {
    const { autoFocus, label, onChange, value } = this.props
    return (
      <div key={label}>
        <Input
          autoFocus={autoFocus}
          onChange={onChange}
          placeholder={`Enter a value for ${label}`}
          value={value}
        />
      </div>
    )
  }
}
