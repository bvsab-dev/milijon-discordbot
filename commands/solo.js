const { Client, GatewayIntentBits } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const polacz = require('../database');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('solo')
    .setDescription('Pokazuje Twój osobisty wynik!'),

  async execute(interaction) {
    const { options } = interaction;
    const user = interaction.user.id;
    const user2 = interaction.user.username

    const query = `SELECT * FROM punkty WHERE userID LIKE ${user}`;

    polacz.query(query, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }

      if (rows.length > 0) {
        const zapyt = rows[0];

        const embed = new EmbedBuilder();
            embed.setColor(0xFFD700)
            embed.setTitle('Oto twój wynik w naszej grze!')
  
          embed.addFields(
            {name: `**Użytkownik:** *${zapyt.usrName}*`, value: `**Ilość punktów:** *${zapyt.pkt}*`}
          )
            
        interaction.reply({ embeds: [embed] });
        
      } else {
        interaction.reply('Nie odpowiedziałeś jeszcze na żadne z pytań użyj /pytaj i zacznij grać!');
      }
    });
  },
}