import { reset } from "../services/playersRepository.js";

const resetMix = async (interaction) => {
  reset();
  interaction.reply({
    content: "Mix resetado :D",
  });
  setTimeout(async () => await interaction.deleteReply(), 1000 * 8);
};
export default resetMix;
