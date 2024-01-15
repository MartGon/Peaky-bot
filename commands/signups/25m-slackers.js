const path = require('path');
const appDir = path.dirname(require.main.filename);

const fetch  = require('node-fetch');
const { SlashCommandBuilder } = require('discord.js');

const { savedVariablesFile } = require(path.join(appDir, 'config.json'));
const { role_id, channel_id, bot_id } = require(path.join(appDir, "25m-config.json"));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('25m-slackers')
		.setDescription("Pings core members that haven't signed up!")
        ,
	async execute(interaction) {

		let savedVariables = require(path.join(appDir, savedVariablesFile));

		const base_url = "https://raid-helper.dev/api/event/";
		const url = base_url + savedVariables.signup_id;
		let settings = { method : "GET"};

		fetch(url, settings)
			.then(res => res.json())
			.then((json) => {
				
				if(interaction.channelId == channel_id) {
					
					let channel = interaction.channel;
					let role_members = channel.members.filter(member => member.roles.cache.hasAny(role_id));

					role_members.each(guild_member => console.log(guild_member.user.username));

					interaction.reply({content: "Correct channel id!", ephemeral: true});
				}
				else{
					interaction.reply({content: "Incorrect channel id!", ephemeral: true})
				}
			});
			
		// Send message pinging everyone
	},
};
