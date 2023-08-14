const { Client, GatewayIntentBits, Collection, ButtonStyle, ComponentType } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('@discordjs/builders');
const polacz = require('../database');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pytaj')
    .setDescription('Zadaje pytanie z gatunku co miał na myśli Marcin'),

  async execute(interaction) {
    const { options } = interaction;

    const query = 'SELECT * FROM pytania';

    polacz.query(query, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }

      if (rows.length > 0) {
        const zapyt = JSON.parse(JSON.stringify(rows));
        

        const embed = new EmbedBuilder()
          .setColor(0xFF0000)
          .setTitle('Oto twoje pytanie');

          
          

          
            const i = Math.floor(Math.random() * zapyt.length); // Zakres liczby (0-7), możesz zmienić go na dowolny inny
            
          
        

        embed.addFields(
          { name: `${zapyt[i].pytanie}`, value: `Odpowiedzi:\n A: ${zapyt[i].A} \n B: ${zapyt[i].B}\n C: ${zapyt[i].C} \n D: ${zapyt[i].D}` }
        );

        const A = new ButtonBuilder()
          .setCustomId('A')
          .setStyle(ButtonStyle.Success)
          .setLabel("🇦");

        const B = new ButtonBuilder()
          .setCustomId('B')
          .setStyle(ButtonStyle.Success)
          .setLabel("🇧");

        const C = new ButtonBuilder()
          .setCustomId('C')
          .setStyle(ButtonStyle.Success)
          .setLabel("🇨");

        const D = new ButtonBuilder()
          .setCustomId('D')
          .setStyle(ButtonStyle.Success)
          .setLabel("🇩");

        const row = new ActionRowBuilder()
          .addComponents(A, B, C, D);

        interaction.reply({
          embeds: [embed],
          components: [row],
        }).then((respond) => {
          const filter = (f) => f.user.id === interaction.user.id;
          const user = interaction.user.id;
          const user2 = interaction.user.username
        
          const collect = respond.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter,
            max: 1,
            time: 60_000,
          });

          collect.on('collect', (interaction) => {
            if (interaction.customId === zapyt[i].odp) {
              interaction.reply("Gratulacje Twoja odpowiedź jest: \n Dobra");

              const query_1 = `SELECT * FROM punkty WHERE userID = ${user}`;
              polacz.query(query_1, (err, rows) => {
                if (err) {
                  console.log(err);
                  return;
                }

                const pkt = JSON.parse(JSON.stringify(rows));
                

                if (pkt.length > 0) {
                  // Użytkownik już istnieje w bazie danych, wykonaj operację UPDATE
                  const query_3 = `UPDATE punkty SET pkt = pkt + 1 WHERE userID = ${user}; `;
                  polacz.query(query_3, (err) => {
                    if (err) {
                      console.log(err);
                    }
                  });
                } else {
                  // Użytkownik nie istnieje w bazie danych, wykonaj operację INSERT
                  const query_2 = `INSERT INTO punkty (id, userID, pkt, usrName) VALUES (NULL, ${user}, '1','${user2}');`;
                  polacz.query(query_2, (err) => {
                    if (err) {
                      console.log(err);
                    }
                  });
                }
              });
            } else {
              interaction.reply("Przykro mi Twoja odpowiedź jest: \nBłędna");
            }
          });

          collect.on('end', () => {
            A.setDisabled(true);
            B.setDisabled(true);
            C.setDisabled(true);
            D.setDisabled(true);
            interaction.editReply({
              embeds: [embed],
              components: [row],
            });
          });
        }).catch((err) => {
          console.log(err);
          interaction.reply('wystapił błąd');
        });
      } else {
        interaction.reply('Wystąpił błąd brak danych w bazie danych');
      }
    });
  },
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             