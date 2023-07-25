import { getAll, save } from "../services/playersRepository.js";
import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} from "discord.js";

const MIN = 0;
const MAX = 21;

const createLevels = () => {
  const options = [];
  for (let lvl = MIN; lvl <= MAX; lvl++) {
    options.push(
      new StringSelectMenuOptionBuilder()
        .setLabel(`Level ${lvl}`)
        .setValue(`${lvl}`)
    );
  }
  return options;
};

const subscribe = async (interaction) => {
  const players = getAll();
  if (
    players.length >= 10 &&
    players.every((player) => player.author.id !== interaction.user.id)
  ) {
    interaction.reply({
      content: "Infelizmente este MIX já está lotado :/",
      ephemeral: true,
    });
    setTimeout(async () => await interaction.deleteReply(), 1000 * 3);
    return;
  }
  const mixMessage = interaction.message;

  const levelSelector = new StringSelectMenuBuilder()
    .setCustomId("level")
    .setPlaceholder("Selecione seu level na GamersClub [0-21]")
    .addOptions(createLevels());

  const row = new ActionRowBuilder();
  row.addComponents(levelSelector);

  const response = await interaction.reply({
    content: `${interaction.user}, selecione seu level!`,
    components: [row],
    ephemeral: true,
  });

  const collectorFilter = (i) => i.user.id === interaction.user.id;

  try {
    const confirmation = await response.awaitMessageComponent({
      filter: collectorFilter,
      time: 60000 * 10,
    });
    if (confirmation) {
      let lvl = parseInt(confirmation.values[0]);
      save({ author: interaction.user, lvl });
      interaction.editReply({
        content: `${interaction.user} (${lvl}) confirmado!`,
        components: [],
      });
      mixMessage.edit(`${players.length || 0} jogadores registrados...`);
      setTimeout(async () => await interaction.deleteReply(), 1000 * 3);
    }
  } catch (e) {
    await interaction.editReply({
      content: "Inscrições encerradas!",
    });
  }
};
export default subscribe;
