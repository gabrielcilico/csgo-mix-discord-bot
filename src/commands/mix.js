import {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import { getAll, reset } from "../services/playersRepository.js";

const data = new SlashCommandBuilder()
  .setName("mix")
  .setDescription("Inicia a criação do MIX (Reseta o último MIX).");

const execute = async (interaction) => {
  reset();
  const subscribeButton = new ButtonBuilder()
    .setCustomId("subscribe")
    .setLabel("Participar")
    .setStyle(ButtonStyle.Success);

  const sortButton = new ButtonBuilder()
    .setCustomId("sort")
    .setLabel("Sortear time")
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder();
  row.addComponents(subscribeButton, sortButton);

  await interaction.reply({
    content: `${interaction.user} iniciou um novo MIX.`,
    components: [row],
  });
};

export default { data, execute };
