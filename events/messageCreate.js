const { Events } = require('discord.js');
const { savedVariablesFile } = require('./config.json');
const fs = require('fs');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        if(isSignupMessage(message)){
            console.log("Message for signups is " + message.id);
        }
	},
};

function isSignupMessage(message){
    let bot_id = "579155972115660803";
    let author = message.author;
    return author.id == bot_id && author.bot && !message.interaction && message.content == '';
}
