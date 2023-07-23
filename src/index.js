// import ready from "./listeners/ready";
import { Client, Events, IntentsBitField, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import commandHandler from "./commands/handler.js";
dotenv.config();

const { DISCORD_TOKEN, PREFIX } = process.env;

let players = [];

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.ClientReady, async () => {
  if (!client.user || !client.application) {
    return;
  }
  console.log(`BOT ${client.user.username} is online`);
});

client.on(Events.MessageCreate, async (message) => {
  const text = message.content;
  if (text.startsWith(PREFIX)) {
    await commandHandler(message);
  }
});

client.login(DISCORD_TOKEN);
