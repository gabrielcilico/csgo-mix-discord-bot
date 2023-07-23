import { getAll } from "../services/playersRepository.js";

const sort = async (interaction) => {
  const values = getAll();
  if (!values || values.length <= 5) {
    interaction.reply({
      content: `Você(s) tem ${values.length} jogador(es). É preciso no mínimo 6 para sortear um MIX.`,
    });
  }
  values.sort((a, b) => b.lvl - a.lvl);
  const teamA = [];
  const teamB = [];
  for (let i = 0; i < values.length; i += 2) {
    const sum = Math.round(Math.random());
    const teamAIndex = sum + i;
    const teamBIndex = (sum ? 0 : 1) + i;
    if (values[teamAIndex]) teamA.push(values[teamAIndex]);
    if (values[teamBIndex]) teamB.push(values[teamBIndex]);
  }

  const calculateLevel = (team) =>
    Math.floor(
      team.reduce((acc, player) => acc + parseInt(`${player.lvl}`), 0) /
        team.length
    );

  const match = {
    teamA: {
      players: teamA,
      level: calculateLevel(teamA),
      totalPlayers: teamA.length,
    },
    teamB: {
      players: teamB,
      level: calculateLevel(teamB),
      totalPlayers: teamB.length,
    },
  };
  interaction.reply({
    content: JSON.stringify(match),
  });
};
export default sort;
