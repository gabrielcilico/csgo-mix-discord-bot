import { reset } from "../services/playersRepository.js"

const start = (message) => {
  const players = reset()
  message.reply(`Iniciando  MIX do ${message.author} com ${players.length} jogadores.`)
}
export default start