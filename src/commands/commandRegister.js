import { REST, Collection, Routes } from "discord.js";
import mix from "./mix.js";
import "../../loadEnv.js";

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const commands = [mix];

export const commandRegister = (client) => {
  client.commands = new Collection();
  for (let index = 0; index < commands.length; index++) {
    const command = commands[index];
    client.commands.set(command.data.name, command.execute);
  }
  deployCommands();
};

export const deployCommands = () => {
  const commansJson = commands.map((command) => command.data.toJSON());
  const rest = new REST().setToken(DISCORD_TOKEN);

  (async () => {
    try {
      console.log(
        `Started refreshing ${commansJson.length} application (/) commands.`
      );

      const data = await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        { body: commansJson }
      );
      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      console.error(error);
    }
  })();
};
