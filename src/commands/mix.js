import {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import actionButtons from "../components/actionButtons.js";

const data = new SlashCommandBuilder()
  .setName("mix")
  .setDescription("Inicia a criação do MIX.");

const execute = async (interaction) => {
  console.log(interaction.user);
  try {
    const mixChannel = await interaction.guild.channels.fetch(
      "1132872277835403266"
    );
    const mixMessage = {
      content: `${interaction.user} iniciou um MIX.`,
      components: [actionButtons()],
    };
    if (interaction.channel.id === mixChannel.id) {
      interaction.reply(mixMessage);
    } else {
      mixChannel.send(mixMessage);
      interaction.reply(`Mix criada no canal ${mixChannel}.`);
      setTimeout(async () => await interaction.deleteReply(), 1000 * 30);
    }
  } catch (e) {
    console.error(e);
  }
};

export default { data, execute };
