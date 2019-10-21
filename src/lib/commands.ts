export type Command = [string, (...args: any) => any]

async function handlePassword({
  password,
  user,
}: {
  password: string
  user: string
}) {
  return new Promise(res => {
    setTimeout(() => {
      res(`Updated ${user}'s password to ${password}`)
    }, 1000)
  })
}

async function changeUsername() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej('Couldnt change password')
    }, 1000)
  })
}

export const commands: Command[] = [
  ["change password for user :user :password", handlePassword],
  ["change name", console.log],
  ["change username", changeUsername],
  ["change avatar", () => alert("upload new avatar")],
]
