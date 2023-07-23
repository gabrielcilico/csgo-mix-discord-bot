import { save } from "../services/playersRepository.js"
import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from 'discord.js'

const MIN = 0;
const MAX = 21;

const createLevels = () => {
  const options = []
  for (let lvl = MIN; lvl <= MAX; lvl++) {
    options.push(new StringSelectMenuOptionBuilder()
    .setLabel(`Level ${lvl}`)
    .setValue(`${lvl}`))
  }
  return options
}

const lvl = async (message) => {
  const levelSelector = new StringSelectMenuBuilder()
  .setCustomId('level')
  .setPlaceholder('Selecione seu level na GamersClub [0-21]')
  .addOptions(createLevels());

const row = new ActionRowBuilder();
row.addComponents(levelSelector);

const response = await message.reply({
  content: 'Selecione seu level!',
  components: [row],
}) 

save({ author: message.author, lvl: parseInt(response) })
message.reply(`${message.author} registrado com o level ${response}.`)
}
export default lvl