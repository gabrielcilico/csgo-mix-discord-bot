// import ready from "./listeners/ready";
import { Client, Events, IntentsBitField, GatewayIntentBits } from "discord.js";
import { commandRegister } from "./commands/commandRegister.js";
import subscribe from "./actions/subscribe.js";
import sort from "./actions/sort.js";
import "./loadEnv.js";

const { DISCORD_TOKEN } = process.env;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
commandRegister(client);

client.on(Events.ClientReady, async () => {
  if (!client.user || !client.application) {
    return;
  }
  console.log(`BOT ${client.user.username} is online`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "subscribe") subscribe(interaction);
    if (interaction.customId === "sort") sort(interaction);
    return;
  }
  if (interaction.isStringSelectMenu()) {
    return;
  }
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  try {
    await command(interaction);
  } catch (e) {
    console.error(
      `Error on call command ${
        interaction.commandName
      }. Stack: ${JSON.stringify(e)}`
    );
  }
});

client.login(DISCORD_TOKEN);
