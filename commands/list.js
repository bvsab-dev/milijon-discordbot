const { Client, GatewayIntentBits, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { OwnerID,acvot,Bashye } = require("../config.json");
const polacz = require('../database');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('only staff command')
    .addStringOption(option =>
        option.setName("list")
            .setDescription("Podaj które pytania chcesz wyświetlić")
            .setRequired(true)
            .addChoices(
              {name: "Lista trudna", value: "hard"},
              {name: "Lista łatwa", value: "pytania"},
            )
    
    ),

  async execute(interaction) {
    const { options } = interaction;
    const user = interaction.user.id;

    if (user === OwnerID|| user === acvot || user === Bashye) {

        const list = options.getString('list');
        if(list ==='pytania') {
            const query = `SELECT * FROM pytania`;

            polacz.query(query, (err, rows) => {
                if (err) {
                  console.log(err);
                  return;
                } 
        
                const zapyt = JSON.parse(JSON.stringify(rows));
                 
        
                  const embed = new EmbedBuilder();
                  embed.setColor(0xFFD700)
                    .setTitle('Oto lista wszystkich łatwych pytań!');
        
                  for(let i =0; i<zapyt.length;i++) {
                    embed.addFields(
                        { name: ` ID:${zapyt[i].id}`, value: `Pytanie: ${zapyt[i].pytanie}\nA: ${zapyt[i].A} \nB: ${zapyt[i].B} \nC: ${zapyt[i].C}\nD: ${zapyt[i].D}\n Dodany przez: **${zapyt[i].add_by}** `, inline: true }
                    );
                    }
                    embed.addFields( { name: "Informacja", value: "Aby wyświetlić więcej niż 25 pierwszych pytań użyj list2"})
                  interaction.reply({ embeds: [embed] });
                  
               
              });
        }

        if(list === 'hard') {
            const query = `SELECT * FROM hard`

            polacz.query(query, (err, rows) => {
                if (err) {
                  console.log(err);
                  return;
                }
        
                const zapyt = JSON.parse(JSON.stringify(rows));
                 
        
                  const embed = new EmbedBuilder();
                  embed.setColor(0xFFD700)
                    .setTitle('Oto lista wszystkich trudnych pytań!');
        
                  for(let i =0; i<zapyt.length;i++) {
                    embed.addFields(
                      { name: ` ID:${zapyt[i].id}`, value: `Pytanie: ${zapyt[i].pytanie}\nA: ${zapyt[i].A} \nB: ${zapyt[i].B} \nC: ${zapyt[i].C}\nD: ${zapyt[i].D}\n Dodany przez: **${zapyt[i].add_by}** `, inline: true }
                    );
                    }
                  interaction.reply({ embeds: [embed] });
               
              });
        }

    }else {
        interaction.reply("Nie jesteś właścicielem bota nie możesz wyświetlić wszystkich pytań")
    }
  }
};
