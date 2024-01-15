const { dirname } = require('path');
const appDir = dirname(require.main.filename);

const fetch  = require('node-fetch');
const { SlashCommandBuilder } = require('discord.js');
const { savedVariablesFile } = require(appDir + '/config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('25m-slackers')
		.setDescription("Pings core members that haven't signed up!")
        ,
	async execute(interaction) {

		let savedVariables = require(appDir + "/" + savedVariablesFile);

		const base_url = "https://raid-helper.dev/api/event/";
		const url = base_url + savedVariables.signup_id;
		let settings = { method : "GET"};

		fetch(url, settings)
			.then(res => res.json())
			.then((json) => {
				console.log(json);
				
				interaction.reply("Hey");
			});
	},
};
