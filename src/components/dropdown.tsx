import * as React from "react"
import { Command } from "lib/commands"

export const Dropdown = ({
  commands,
  onClick,
}: {
  commands: Command[]
  onClick(c: Command): void
}) => (
  <DropdownList>
    {commands.map(command => (
      <DropdownItem
        key={command[0]}
        onClick={() => onClick(command)}
        label={command[0]}
      />
    ))}
  </DropdownList>
)

const DropdownList = ({ children }) => (
  <div
    className="dropdown-menu"
    style={{ display: "block", position: "static" }}
  >
    {children}
  </div>
)

const DropdownItem = ({ label, onClick }) => (
  <div className="dropdown-item">
    <button
      type="button"
      onClick={onClick}
      style={{ background: "none", border: "none" }}
    >
      {label}
    </button>
  </div>
)
