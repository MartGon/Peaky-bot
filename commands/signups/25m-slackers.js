const path = require('path');
const appDir = path.dirname(require.main.filename);

const fetch  = require('node-fetch');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const { savedVariablesFile } = require(path.join(appDir, 'config.json'));
const { role_id, channel_id } = require(path.join(appDir, "25m-config.json"));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('25m-slackers')
		.setDescription("Pings core members that haven't signed up!")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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
					
					let signups = json['signups'];

					let channel = interaction.channel;
					let role_members = channel.members.filter(gmember => gmember.roles.cache.hasAny(role_id));
					let slackers = getSlackers(signups, role_members);
					
					let ping_msg = "Missing signups from: \n";
					if(slackers.length > 0)
					{
						for(let i in slackers)
							ping_msg += (slackers[i] + '\n');
	
						// Send message pinging every slacker
						interaction.channel.send(ping_msg);
					}
					else
						interaction.reply({content: "There were no members to ping. Everyone signed up!", ephemeral: true});
				}
				else{
					interaction.reply({content: "Incorrect channel id to poing from!", ephemeral: true})
				}
			});
	},
};

function getSlackers(signups, role_members)
{
	let missing_members = role_members.filter(gmember => {
		for(let i in signups){
			if(gmember.user.id == signups[i]['userid'])
				return false;
		}
		return true;
	});
	let slackers = []
	missing_members.each(gmember => slackers.push(gmember.user.toString()));
	
	return slackers;
}
