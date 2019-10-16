import * as React from "react"

export const Button = ({ children, onClick }) => (
  <button className="btn btn-primary" type="button" onClick={onClick}>
    {children}
  </button>
)
