const { dirname } = require('path');
const appDir = dirname(require.main.filename);

const { Events } = require('discord.js');
const fs = require('fs');
const { savedVariablesFile } = require(appDir + '/config.json');
const { raid_bot_id, channel_id} = require(appDir + '/25m-config.json')

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {

        // Check for 25M Sign up raid bot message
        if(is25MSignupMessage(message)){
            console.log("Message for signups is " + message.id);
            let savedVariables = require(appDir + "/" + savedVariablesFile);
            savedVariables.signup_id = message.id;

            fs.writeFile(savedVariablesFile, JSON.stringify(savedVariables, null, 4), (err) => {
                if (err) { console.error(err); return; };
                console.log("Wrote to saved variables file");
            })
        }

	},
};

function is25MSignupMessage(message){
    let author = message.author;
    return author.id == raid_bot_id && author.bot && !message.interaction && message.content == '' && message.channelId == channel_id;
}
