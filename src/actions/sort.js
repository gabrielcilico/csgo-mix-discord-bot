import { getAll } from "../services/playersRepository.js";
import { EmbedBuilder } from "discord.js";

const sort = async (interaction) => {
  const values = getAll();
  // if (!values || values.length <= 5) {
  //   interaction.reply({
  //     content: `Você(s) tem ${values.length} jogador(es). É preciso no mínimo 6 para sortear um MIX.`,
  //   });
  //   return;
  // }
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
    ) || 0;

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

  const date = new Date();
  const title = `Mix [${date.getTime()}]`;
  const timeAName = `Time A (${match.teamA.level}) - ${
    match.teamA.players.length ?? 0
  }/5`;
  const timeBName = `Time B (${match.teamB.level}) - ${
    match.teamB.players.length ?? 0
  }/5`;

  const teamMemberEvaluate = (team) => {
    return (
      team.players
        .map((player) => `- (${player.lvl}) ${player.author}`)
        .join("\n") || "Time vazio :/"
    );
  };

  const sortedMatch = new EmbedBuilder()
    .setColor(0x8844ee)
    .setTitle(title)
    .setDescription(`Gerado à(s) ${date.toLocaleString()}`)
    .addFields(
      {
        name: timeAName,
        value: teamMemberEvaluate(match.teamA),
        inline: true,
      },
      {
        name: timeBName,
        value: teamMemberEvaluate(match.teamB),
        inline: true,
      }
    )
    .setFooter({
      text: `Gerado por ${interaction.user.username}`,
      iconURL: "https://i.imgur.com/HTgiNsV.png",
    })
    .setTimestamp();

  interaction.reply({
    embeds: [sortedMatch],
  });
};
export default sort;
