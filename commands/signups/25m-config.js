const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('25m-config')
		.setDescription('Configs params for 25M Signups!')
        .addStringOption(option => option.setName("title").
            setDescription("Title for the sign up")
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        ,
	async execute(interaction) {
        
        let title = interaction.options.getString("title");
		await interaction.reply('Signup title is: ' + title);
	},
};
