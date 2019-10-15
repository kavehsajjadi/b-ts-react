export type Command = [string, (...args: any) => void]

export const commands: Command[] = [
  ["change name", console.log],
  ["change username", console.log],
  ["change avatar", () => alert("upload new avatar")],
  ["change password :password", console.info],
]

function noop() {
  return undefined
}

for (let i = 0; i < 10000; i++) {
  commands.push([`a${i}`, noop])
}
