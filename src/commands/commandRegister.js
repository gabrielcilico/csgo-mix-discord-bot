import { REST, Collection, Routes } from "discord.js";
import start from "./start.js";

const commands = [start];

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
  console.log(process.env.TOKEN);
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
          "1132463461843075154"
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
