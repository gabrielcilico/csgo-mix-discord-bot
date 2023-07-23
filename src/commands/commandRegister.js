import { REST, Collection, Routes } from "discord.js";
import mix from "./mix.js";

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
  const rest = new REST().setToken(
    "MTEzMjQ2MjQ0MTgxNzcxODgwNA.GniDVo.ejqT8EElnLkzB4K2b6lZQnpzRLHokiMAD8V_yQ"
  );

  (async () => {
    try {
      console.log(
        `Started refreshing ${commansJson.length} application (/) commands.`
      );

      const data = await rest.put(
        Routes.applicationGuildCommands(
          "1132462441817718804",
          "700761715041632369"
        ),
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
