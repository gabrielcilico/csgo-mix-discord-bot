import {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import { getAll, reset } from "../services/playersRepository.js";

const data = new SlashCommandBuilder()
  .setName("start")
  .setDescription("Inicia a criação do MIX (Reseta o último MIX).");

const execute = async (interaction) => {
  const players = reset();

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

  const response = await interaction.reply({
    content: `${interaction.user} iniciou um novo MIX.`,
    components: [row],
  });

  const collectorFilter = (i) => i.user.id === interaction.user.id;

  try {
    const confirmation = await response.awaitMessageComponent({
      filter: collectorFilter,
      time: 60000 * 10,
    });
    console.log(confirmation);
    if (confirmation) {
      await interaction.editReply({
        content: `${interaction.user} criou um MIX com ${
          getAll().length
        } jogadores.`,
      });
    }
  } catch (e) {
    await interaction.editReply({
      content: "Inscrições encerradas!",
    });
  }
};

export default { data, execute };
