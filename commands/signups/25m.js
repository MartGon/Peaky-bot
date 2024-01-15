const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('25m')
		.setDescription('Returns command to create next 25M Signup!')

        ,

	async execute(interaction) {
		let command = "/quickcreate";
		let template = "4";
		let day = 3; // Wednesday
        let title = "Icecrown Citadel" // Should get from config file
		let time = "19:45";

		let date = new Date();
		date.setDate(date.getDate() + ((day + 7 - date.getDay()) % 7) || 7);
		let dateStr = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

		let fullcommand = getFullCommand(command, template, title, time, dateStr);
		await interaction.reply({content: fullcommand, ephemeral: true});
	},
};

function getFullCommand(command, template, title, time, date){
	return command + toOption("template", template) + toOption("title", title) + toOption("time", time) + toOption("date", date);
}

function toOption(name, value){
	return " [" + name + ":" + value + "]";
}
