import * as React from "react"
import { limit } from "lib/limit"
import { match } from "lib/match"
import { ComponentState, SetState, STATE } from "lib/states"

export class Input extends React.Component<{
  value: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  autoFocus?: boolean
}> {
  inputRef = React.createRef<HTMLInputElement>()

  componentDidMount() {
    if (this.props.autoFocus && this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }

  render() {
    const { value, onChange } = this.props
    return (
      <input
        type="text"
        className="form-control"
        onChange={onChange}
        value={value}
        ref={this.inputRef}
      />
    )
  }
}
