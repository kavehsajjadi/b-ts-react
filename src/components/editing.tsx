import * as React from "react"
import { Command, commands } from "lib/commands"
import { limit } from "lib/limit"
import { match } from "lib/match"
import { extractParams } from "lib/extract_params"
import { EditingQuery, SetState, STATE } from "lib/states"
import { Dropdown, DropdownItem } from "components/dropdown"
import { Input } from "components/input"

export const Editing = ({
  state,
  setState,
}: {
  state: EditingQuery
  setState: SetState
}) => {
  const inputRef = React.useRef<Input>()
  const items = itemsFromCommands(state.commands, state.query)
  const [focused, setFocused] = React.useState(-1)
  const { commands, query } = state
  useKeydownHandlers(items, focused, setFocused, updateFocusedNode(items, inputRef))

  return (
    <>
      <Input
        ref={inputRef}
        autoFocus={focused === -1}
        value={query}
        placeholder="What would you like to do?"
        onChange={handleQueryUpdate(setState)}
      />
      {commands.length > 0 && (
        <Dropdown items={items} onClick={handleCommandClick(setState)} />
      )}
    </>
  )
}

function useKeydownHandlers(items, focused, setFocused, updateFocusedNode) {
  React.useEffect(() => {
    const keyPressHandler = e => {
      switch (e.key) {
        case "ArrowDown":
          if (commands.length > 0 && focused < commands.length - 1) {
            const newIndex = focused + 1
            setFocused(newIndex)
            updateFocusedNode(newIndex)
          }
          break
        case "ArrowUp":
          if (focused > -1) {
            const newIndex = focused - 1
            setFocused(newIndex)
            updateFocusedNode(newIndex)
          }
          break
        default:
          break
      }
    }

    document.addEventListener("keydown", keyPressHandler)
    return () => {
      document.removeEventListener("keydown", keyPressHandler)
    }
  })
}

function itemsFromCommands(commands: Command[], query: string) {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    setItems(
      commands.map(command => ({
        command,
        ref: React.createRef<DropdownItem>(),
      })),
    )

    return () => {
      setItems([])
    }
  }, [query]) // [query] is to make sure it only updates when query changes

  return items
}

function handleQueryUpdate(
  setState: SetState,
): (e: React.ChangeEvent<HTMLInputElement>) => void {
  return e => {
    setState({
      type: STATE.EDITING_QUERY,
      query: e.target.value,
      commands: limit(match(e.target.value), 4),
    })
  }
}

function handleCommandClick(setState: SetState): (command: Command) => void {
  return command => {
    setState({
      type: STATE.ADDING_ARGUMENTS,
      command,
      params: extractParams(command[0]),
    })
  }
}

function updateFocusedNode(items, inputRef) {
  return index => {
    if (index === -1) {
      inputRef.current.focus()
    } else {
      items[index].ref.current.focus()
    }
  }
}
