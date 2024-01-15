const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('25m-slackers')
		.setDescription("Pings core members that haven't signed up !")
        ,
	async execute(interaction) {
        // 1196410664240025662
        await interaction.reply("Hey");
	},
};
