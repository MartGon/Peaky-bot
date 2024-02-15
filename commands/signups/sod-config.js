const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

const appDir = path.dirname(require.main.filename);
const { sodConfigFile } = require(appDir + '/config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sod-config')
		.setDescription('Configs params for SoD Signups!')
        .addStringOption(option => option.setName("title").
            setDescription("Default title for the sign up")
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        ,
	async execute(interaction) {
        
        let sodConfigFilePath = path.join(appDir, sodConfigFile);
        let sod_config = require(sodConfigFilePath);
        sod_config.title = interaction.options.getString("title");;
        fs.writeFile(sodConfigFilePath, JSON.stringify(sod_config, null, 4), (err) => {
            if (err) { console.error(err); return; };
            console.log("Wrote to saved variables file");
        })

		await interaction.reply('New SoD config was saved successfully: ' + JSON.stringify(sod_config, null, 4));
	},
};
