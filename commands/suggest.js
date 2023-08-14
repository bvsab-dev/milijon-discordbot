const { Client, GatewayIntentBits, Collection, ButtonStyle, ComponentType } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('@discordjs/builders');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const {cid} = require('../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('sugestia')
    .setDescription("Dodajesz propozycję pytania do dodania!, działa tylko na dev serwerze!!")
    .addStringOption(option =>
            option.setName("pytanie")
                .setDescription("Podaj pytanie")
                .setRequired(true)
        
        )
        .addStringOption(option =>
            option.setName("odpowiedzprawidlowa")
                .setDescription("Podaj prawidłową odpowiedź")
                .setRequired(true)
        
        )
        .addStringOption(option =>
            option.setName("odpowiedz1")
                .setDescription("Podaj sugerowaną odpowiedź")
                
        
        )
        .addStringOption(option =>
            option.setName("odpowiedz2")
                .setDescription("Podaj sugerowaną odpowiedź")
        
        )
        .addStringOption(option =>
            option.setName("odpowiedz3")
                .setDescription("Podaj sugerowaną odpowiedź")
                
        ),
    async execute(interaction) {

        const {guild,options,member} = interaction
        if(guild.id === cid) {
        const nazwa = options.getString('pytanie');
        const odp = options.getString('odpowiedzprawidlowa');
        const odp1 = options.getString('odpowiedz1');
        const odp2 = options.getString('odpowiedz2');
        const odp3 = options.getString('odpowiedz3');
        const user2 = interaction.user.username;
        const embed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setDescription(`**Sugestia została wysłana przez ${user2}**`)
            .addFields(
                {name:'Nazwa pytania: ', value:`${nazwa}`},
                {name: 'Sugestia odpowiedzi 1: ', value: `${odp1}`},
                {name: 'Sugestia odpowiedzi 2: ', value: `${odp2}`},
                {name: 'Sugestia odpowiedzi 3: ', value: `${odp3}`},
                {name: 'Prawidlowa odpowiedź: ', value: `${odp}`},
            )
            .addFields(
                {value: "Kliknij na odpowiednie emoji aby zagłosować!"}
            )
            .setTimestamp()    
            .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({dynamic:true})});
            

            
 
          //  .setLabel("✅");
  

           // .setLabel("🚫");
           const message = await interaction.guild.channels.cache.get('1136610799817867374').send({embeds: [embed],});
           interaction.reply("Dziękuję za dodanie sugestii")
           

            await message.react('✅');
            await message.react('🚫');
        }else {
            interaction.reply({content:"Nie możesz wysłać propozycji gdyż nie jesteś na serwerze developerskim Milijon",ephemeral: true})
        }
   }
}