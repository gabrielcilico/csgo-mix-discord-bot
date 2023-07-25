import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";

const actionButtons = () => {
  const subscribeButton = new ButtonBuilder()
    .setCustomId("subscribe")
    .setLabel("Participar")
    .setStyle(ButtonStyle.Success);

  const sortButton = new ButtonBuilder()
    .setCustomId("sort")
    .setLabel("Sortear time")
    .setStyle(ButtonStyle.Primary);

  const resetButton = new ButtonBuilder()
    .setCustomId("reset")
    .setLabel("Resetar MIX")
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder();
  row.addComponents(subscribeButton, sortButton, resetButton);
  return row;
};

export default actionButtons;
