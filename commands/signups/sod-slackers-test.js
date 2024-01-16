const path = require('path');
const appDir = path.dirname(require.main.filename);

const fetch  = require('node-fetch');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const { raid_bot_id, role_id, channel_id } = require(path.join(appDir, "sod-config.json"));
const base_url = "https://raid-helper.dev/api/event/";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sod-slackers-test')
		.setDescription("Pings core members that haven't signed up!")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        ,
	async execute(interaction) {

        let channel = interaction.channel;
        let messages = channel.messages;
        let signups = await getSignups(messages);

        if(interaction.channelId == channel_id) {
					
            let role_members = channel.guild.members.cache.filter(gmember => {
                return gmember.roles.cache.hasAny(role_id)
            });
            let slackers = getSlackers(signups, role_members);
            
            if(slackers.length > 0)
            {
                let ping_msg = "Missing signups from: \n";
                for(let i in slackers)
                    ping_msg += (slackers[i] + '\n');
                interaction.reply({content: ping_msg, ephemeral: true});
            }
            else
                interaction.reply({content: "There were no members to ping. Everyone signed up!", ephemeral: true});
                
        }
        else{
            interaction.reply({content: "Incorrect channel id to poing from!", ephemeral: true})
        }
	},
};

async function getSignups(messages){
    let fetched_msgs = await messages.fetch({limit: 100}).then();
        console.log(`Received ${fetched_msgs.size} messages`);
        let signup_ids = [];

        let signup_msgs = fetched_msgs.filter((message) => isSoDSignupMessage(message));
        signup_msgs.each(msg => signup_ids.push(msg.id));
        
        let signup_promises = [];
        for(i in signup_ids){
            let signup_id = signup_ids[i];
            const url = base_url + signup_id;
            let settings = { method : "GET"};
            signup_promises.push(fetch(url, settings).then(res => res.json()).then(res => res['signups']));
        }

        return await Promise.all(signup_promises);
}

function isSoDSignupMessage(message){
    let author = message.author;
    return author.id == raid_bot_id && author.bot && !message.interaction && message.content == '' && message.channelId == channel_id;
}

function getSlackers(signups, role_members)
{
	let missing_members = role_members.filter(gmember => {
        for(let i in signups){
            for(let j in signups[i]){
                if(gmember.user.id == signups[i][j]['userid'])
                    return false;
            }
        }
		return true;
	});
	let slackers = []
	missing_members.each(gmember => slackers.push(gmember.user.toString()));
	
	return slackers;
}
