import enter from "./enter.js"
import start from "./start.js"
import sort from "./sort.js";

import "dotenv";

const commandHandler = async (message) => {
  const commandPrefix = process.env.PREFIX || ''
  const text = message.content
  let command = text.substring(commandPrefix.length, text.length).trim()

  if (command === 'start') {
    return start(message)
  }
  if (command.startsWith('enter')) {
    return await enter(message)
  }
  if (command.startsWith('sort')) {
    return sort(message)
  }
  message.reply(`${message.author} digite um commando válido (use ".mix help").`)
}
export default commandHandler