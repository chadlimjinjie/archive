const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('switch')
		.setDescription('Turns on/off switch!')
  	.addIntegerOption(option => option.setName('mode').setDescription('Enter a string')
      .setRequired(true)
      .addChoices({
        name: "On",
        value: 1
      }, {
        name: "Off",
        value: 0
      })),
	async execute(interaction) {
    const mode = interaction.options.getInteger('mode') === 1;
    console.log(mode);
		await interaction.reply('Pong!');
	},
};