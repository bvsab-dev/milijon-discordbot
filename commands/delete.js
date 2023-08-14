const { Client, GatewayIntentBits, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { OwnerID,acvot,Bashye } = require("../config.json");
const polacz = require('../database');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete')
    .setDescription('only staff command')
    .addStringOption(option =>
        option.setName("list")
            .setDescription("Podaj listę gdzie usuwamy")
            .setRequired(true)
            .addChoices(
                {name: "Lista trudna", value: "hard"},
                {name: "Lista łatwa", value: "pytania"},
              )
    
    )
    .addStringOption(option =>
        option.setName("id")
            .setDescription("Podaj id rekordu do usunięcia")
            .setRequired(true)
    
    ),


  async execute(interaction) {
    const { options } = interaction;
    const user = interaction.user.id;
    const list = options.getString('list');
    const id = options.getString('id');
    if (user === OwnerID|| user === acvot || user === Bashye) {

        if(list === 'pytania') {
        const query = `DELETE FROM pytania WHERE pytania.id = ${id}`;

        polacz.query(query, (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }


          const embed = new EmbedBuilder();
          embed.setColor(0xFF0000)
            .setTitle('Pytanie zostało usunięte!');

          
            embed.addFields(
              {name:"Usunięto rekord o ID: ", value: `${id}`}
            );
          
          interaction.reply({ embeds: [embed] });
        
      });
    }

    if(list === 'hard') {
        const query = `DELETE FROM hard WHERE hard.id = ${id}`;

        polacz.query(query, (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }

        
      

          const embed = new EmbedBuilder();
          embed.setColor(0xFF0000)
            .setTitle('Pytanie zostało usunięte!');

          
            embed.addFields(
              {name:"Usunięto rekord o ID: ", value: `${id}`}
            );
          
          interaction.reply({ embeds: [embed] });
        
      });
    }

    
    }else {
        interaction.reply("Nie jesteś właścicielem bota nie możesz dodać pytań zamiast tego użyj /sugestia")
    }
  }
};