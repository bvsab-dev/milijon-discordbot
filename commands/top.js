const { Client, GatewayIntentBits } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const polacz = require('../database');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('top')
    .setDescription('Pokazuje TOP 10 graczy'),

  async execute(interaction) {
    const { options } = interaction;

    const query = `SELECT punkty.usrName, punkty.pkt FROM punkty ORDER BY punkty.pkt DESC `;

    polacz.query(query, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }

      if (rows.length > 0) {
        const zapyt = JSON.parse(JSON.stringify(rows));

        const embed = new EmbedBuilder();
            embed.setColor(0xFFD700)
            embed.setTitle('Lista najlepszych graczy')


            for(let i =0; i<zapyt.length && i<10; i++) {       
        // Poprawiamy tworzenie embeda na MessageEmbed
                
                
          
          embed.addFields(
            {name: `**Użytkownik:** *${zapyt[i].usrName}*`, value: `**Ilość punktów:** *${zapyt[i].pkt}*`}
          )
            }
        interaction.reply({ embeds: [embed] });
        
      } else {
        interaction.reply('Wystąpił błąd brak danych w bazie danych');
      }
    });
  },
}