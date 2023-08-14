const { Client, GatewayIntentBits, Collection, ButtonStyle, ComponentType } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('@discordjs/builders');
const { OwnerID,acvot,Bashye } = require("../config.json");
const polacz = require('../database');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const fs = require('fs')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('list2')
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
        
                const zapyt = JSON.stringify(rows);

                  const embed = new EmbedBuilder();
                  embed.setColor(0xFFD700)
                    .setTitle('Oto lista łatwych pytań!');
        
                    embed.addFields(
                        { name: "Oto lista wszystkich łatwych pytań", value: "Jest ona w wysłanym pliku" }

                    );
                  
                    const filePath = 'list.json';
                  
                    fs.writeFile(filePath, zapyt, (err) => {
                      if (err) {
                        console.error('Błąd podczas zapisu do pliku:', err);
                      } else {
                        console.log('Wyniki zapisane do pliku:', filePath);
                      }
                  
    
                      
                    });

                    
                  interaction.reply({ embeds: [embed], files: ['./list.json'] });
                  

              });
            
          
        }

        if(list ==='hard') {
            const query = `SELECT * FROM hard`;

            polacz.query(query, (err, rows) => {
                if (err) {
                  console.log(err);
                  return;
                } 
        
                const zapyt = JSON.stringify(rows);

                  const embed = new EmbedBuilder();
                  embed.setColor(0xFFD700)
                    .setTitle('Oto lista trudnych pytań!');
        
                    embed.addFields(
                        { name: "Oto lista wszystkich trudnych pytań", value: "Jest ona w wysłanym pliku" }

                    );
                  
                    const filePath = 'list_hard.json';
                  
                    fs.writeFile(filePath, zapyt, (err) => {
                      if (err) {
                        console.error('Błąd podczas zapisu do pliku:', err);
                      } else {
                        console.log('Wyniki zapisane do pliku:', filePath);
                      }
                  
    
                      
                    });

                    
                  interaction.reply({ embeds: [embed], files: ['./list_hard.json'] });
                  

              });
            
          
        }

    }else {
        interaction.reply("Nie jesteś właścicielem bota nie możesz wyświetlić wszystkich pytań")
    }
  }
  

  
};