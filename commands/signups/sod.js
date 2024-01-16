const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sod')
		.setDescription('Returns command to create next SoD Signups!')

        ,

	async execute(interaction) {
		let command = "/quickcreate";
		let template = "37";
		let nextDays = 3;
        let title = "Blackfathom Deeps" // Should get from config file
		let times = ["18:00", "19:45", "20:30"];

        let fullcommands = []
        for(let day = 1; day < nextDays + 1; day++){
            let date = new Date();
		    date.setDate(date.getDate() + day);
		    let dateStr = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

            for(let i in times)
            {
                let time = times[i];
                let fullcommand = getFullCommand(command, template, title, time, dateStr);
                fullcommands.push(fullcommand);
            }
        }

        let message = "";
        for(let i in fullcommands)
            message += (fullcommands[i] + '\n');

		await interaction.reply({content: message, ephemeral: true});
	},
};

function getFullCommand(command, template, title, time, date){
	return command + toOption("template", template) + toOption("title", title) + toOption("time", time) + toOption("date", date);
}

function toOption(name, value){
	return " [" + name + ":" + value + "]";
}
