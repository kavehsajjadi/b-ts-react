import * as React from "react"
import { Command, commands } from "lib/commands"
import { ComponentState, SetState, STATE } from "lib/states"
import { getArgs } from "lib/get_arguments"
import { evaluate } from "lib/evaluate"
import { Editing } from "components/editing"
import { AddingArguments } from "components/adding_arguments"
import { ExecutingCommand } from "components/executing_command"
import { ExecutedCommand } from "components/executed_command"

const initialCommand: Command = ["", () => undefined]

const initialMode: ComponentState = {
  type: STATE.EDITING_QUERY,
  query: "",
  commands: [],
  //type: STATE.ADDING_ARGUMENTS,
  //command: ["change password :password", console.log],
  //params: {},
}

export const Home = () => {
  const [command, setCommand] = React.useState(initialCommand)
  const [query, setQuery] = React.useState<string>("")
  const [state, setState] = React.useState<ComponentState>(initialMode)
  const parts = getArgs(command)
  const updateState = (state: ComponentState) => setState(state)

  switch (state.type) {
    case STATE.EDITING_QUERY:
      return <Editing state={state} setState={updateState} />
    case STATE.ADDING_ARGUMENTS:
      return <AddingArguments state={state} setState={updateState} />
    case STATE.EXECUTING_COMMAND:
      return <ExecutingCommand state={state} setState={updateState} />
    case STATE.EXECUTED_COMMAND:
      return <ExecutedCommand state={state} setState={updateState} />
    default:
      throw new Error(`Define a case for state: ${state.type}`)
  }
}

const ArgumentFields = ({ values }) => (
  <div>
    {values.map(value => (
      <div key={value}>
        <input type="text" value={value} />
      </div>
    ))}
  </div>
)
