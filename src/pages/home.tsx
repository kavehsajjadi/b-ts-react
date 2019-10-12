import * as React from "react"

type Command = [string, (...args: any) => void]

const commands: Command[] = [
  ["a", console.log],
  ["b", console.error],
  ["change password :id", console.info],
  ["changepassword user :user password :password", console.info],
]

function match(q: string) {
  const queryParts = q.split(" ")

  const filteredCommands = commands.filter(([command, fn]) => {
    const commandParts = command.split(" ")

    // if our query is longer than the command drop it
    if (queryParts.length > commandParts.length) {
      return false
    }

    for (let i = 0; i < queryParts.length; i++) {
      const qp = queryParts[i]
      const cp = commandParts[i]

      if (cp.startsWith(":")) {
        // if the query part we're checking matches a param its always true
        return true
      } else {
        // otherwise the query part needs to exactly match the command part
        return cp.includes(qp)
      }
    }
  })

  if (filteredCommands.length === commands.length) return []

  filteredCommands.sort((a, b) => {
    return b[0].length - a[0].length
  })

  return filteredCommands
}

function evaluate(query: string) {
  const commands = match(query)
  const command = commands[0]
  const fn = command[1]
  const commandParts = command[0].split(" ")
  const queryParts = query.split(" ")

  const args = {}
  queryParts.forEach((queryPart, index) => {
    const cp = commandParts[index]
    if (cp.startsWith(":")) {
      args[cp.slice(1, cp.length + 1)] = queryPart
    }
  })

  fn(args)
}

export const Home = () => {
  const [query, setQuery] = React.useState("")
  const commands = match(query)

  return (
    <div>
      <div className="input-group-append">
        <input
          type="text"
          className="form-control"
          onChange={e => setQuery(e.target.value)}
          value={query}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => evaluate(query)}
          style={{ background: "none", border: "none" }}
        >
          Go
        </button>
      </div>
      {commands.length != 0 && (
        <div
          className="dropdown-menu"
          style={{ display: "block", position: "static" }}
        >
          {commands.map(command => {
            const [commandString, fn] = command
            return (
              <div className="dropdown-item" key={commandString}>
                <button
                  type="button"
                  onClick={() => setQuery(commandString)}
                  style={{ background: "none", border: "none" }}
                >
                  {commandString}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
