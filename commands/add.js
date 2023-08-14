const { Client, GatewayIntentBits, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { OwnerID,acvot,Bashye } = require("../config.json");
const polacz = require('../database');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('only staff command')
    .addStringOption(option =>
      option.setName("list")
          .setDescription("Podaj liste do której dodać pytanie")
          .setRequired(true)
          .addChoices(
            {name: "Lista trudna", value: "hard"},
            {name: "Lista łatwa", value: "pytania"},
          )
  
  )

    .addStringOption(option =>
        option.setName("pytanie")
            .setDescription("Podaj pytanie")
            .setRequired(true)
    
    )
    .addStringOption(option =>
        option.setName("a")
            .setDescription("Podaj odpowiedz A")
            .setRequired(true)
    
    )
    .addStringOption(option =>
        option.setName("b")
            .setDescription("Podaj odpowiedz B")
            .setRequired(true)
    
    )
    .addStringOption(option =>
        option.setName("c")
            .setDescription("Podaj odpowiedz D")
            .setRequired(true)
    
    )
    .addStringOption(option =>
        option.setName("d")
            .setDescription("Podaj odpowiedz D")
            .setRequired(true)
    
    )
    .addStringOption(option =>
        option.setName("trueodp")
            .setDescription("Podaj prawidłową odpowiedź")
            .setRequired(true)
            .addChoices(
              {name: "A", value: "A"},
              {name: "B", value: "B"},
              {name: "C", value: "C"},
              {name: "D", value: "D"}
            )
    
    ),

  async execute(interaction) {
    const { options } = interaction;
    const user = interaction.user.id;
    const name = interaction.user.username;
    const pytanie = options.getString('pytanie');
    const list = options.getString('list');
    const A = options.getString('a');
    const B = options.getString('b');
    const C = options.getString('c');
    const D = options.getString('d');
    const answer = options.getString('trueodp');
    if (user === OwnerID|| user === acvot || user === Bashye) {
      if(list === 'pytania'){
        const query = `INSERT INTO pytania (id, pytanie, A, B, C, D, odp,add_by) VALUES (NULL, ?, ?, ?, ?, ?, ?,?)`;

        polacz.query(query, [pytanie, A, B, C, D, answer,name], (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }

          const embed = new EmbedBuilder();
          embed.setColor(0x1FFF00)
            .setTitle('Pytanie zostało dodane do listy EASY!');

          
            embed.addFields(
              { name: `**Pytanie: ${pytanie}**`, value: `**Odpowiedzi** \n*A: ${A}* \n *B: ${B}*\n*C: ${C}*\n*D: ${D}\n **Prawidłowa odpowiedź:** *${answer}*` }
            );
          
          interaction.reply({ embeds: [embed] });
       
      });
    } 
    if(list ==='hard') {

      const query1 = `INSERT INTO hard (id, pytanie, A, B, C, D, odp, add_by) VALUES (NULL, ?, ?, ?, ?, ?, ?,?)`;

        polacz.query(query1, [pytanie, A, B, C, D, answer,name], (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }

        
         

          const embed = new EmbedBuilder();
          embed.setColor(0x1FFF00)
            .setTitle('Pytanie zostało dodane do listy HARD!');

          
            embed.addFields(
              { name: `**Pytanie: ${pytanie}**`, value: `**Odpowiedzi** \n*A: ${A}* \n *B: ${B}*\n*C: ${C}*\n*D: ${D}\n **Prawidłowa odpowiedź:** *${answer}*` }
            );
          
          interaction.reply({ embeds: [embed] });
       
      });
    }
    }else {
        interaction.reply("Nie jesteś właścicielem bota nie możesz dodać pytań zamiast tego użyj /sugestia")
    }
  }
};
