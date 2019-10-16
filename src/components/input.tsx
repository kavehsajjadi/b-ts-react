import * as React from "react"
import { limit } from "lib/limit"
import { match } from "lib/match"
import { ComponentState, SetState, STATE } from "lib/states"

export class Input extends React.Component<{
  value: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  placeholder?: string
  autoFocus?: boolean
}> {
  inputRef = React.createRef<HTMLInputElement>()

  componentDidMount() {
    if (this.props.autoFocus && this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }

  render() {
    const { onChange, placeholder, value } = this.props
    return (
      <input
        type="text"
        className="form-control"
        onChange={onChange}
        placeholder={placeholder}
        ref={this.inputRef}
        value={value}
      />
    )
  }
}
