import { save } from "../services/playersRepository.js";
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
  const levelSelector = new StringSelectMenuBuilder()
    .setCustomId("level")
    .setPlaceholder("Selecione seu level na GamersClub [0-21]")
    .addOptions(createLevels());

  const row = new ActionRowBuilder();
  row.addComponents(levelSelector);

  const response = await interaction.reply({
    content: `${interaction.user}, selecione seu level!`,
    components: [row],
  });

  const collectorFilter = (i) => i.user.id === interaction.user.id;

  try {
    const confirmation = await response.awaitMessageComponent({
      filter: collectorFilter,
      time: 60000 * 10,
    });
    if (confirmation) {
      const lvl = parseInt(confirmation.values[0]);
      save({ author: interaction.user, lvl });
      interaction.editReply({
        content: `${interaction.user} (${lvl}) confirmado!`,
        components: [],
      });
    }
  } catch (e) {
    await interaction.editReply({
      content: "Inscrições encerradas!",
    });
  }
};
export default subscribe;
