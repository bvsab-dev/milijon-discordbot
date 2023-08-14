const { Client, GatewayIntentBits, Collection, ButtonStyle, ComponentType } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('@discordjs/builders');
const polacz = require('../database');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hardquest')
    .setDescription('Zadaje trudne pytanie o Marcińską gwarę ludową'),

  async execute(interaction) {
    const { options } = interaction;

    const query = 'SELECT * FROM hard';

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

        const i = Math.floor(Math.random() * zapyt.length);
          

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
          const user2 = interaction.user.username;
        
          const collect = respond.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter,
            max: 1,
            time: 30_000,
          });

          collect.on('collect', (interaction) => {
            if (interaction.customId === zapyt[i].odp) {
              if (i === 1) {
                interaction.reply({ content: 'Brawo tracisz 1000 punktów!', ephemeral: true });
                const query_6 = `UPDATE punkty SET pkt = pkt - 1000 WHERE userID = ${user}; `;
                polacz.query(query_6, (err) => {
                  if (err) {
                    console.log(err);
                  }
                });
          
                setTimeout(() => {
                  const query_7 = `UPDATE punkty SET pkt = pkt + 1000 WHERE userID = ${user}; `;
                  polacz.query(query_7, (err) => {
                    if (err) {
                      console.log(err);
                    }
                  });
                  interaction.editReply("Żartowałem xD");
                }, 10 * 60 * 1000);
              } else {
                const query_1 = `SELECT * FROM punkty WHERE userID = ${user}`;
                polacz.query(query_1, (err, rows) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
          
                  const pkt = JSON.parse(JSON.stringify(rows));
          
                  if (pkt.length > 0) {
                    // Użytkownik już istnieje w bazie danych, wykonaj operację UPDATE
                    const query_3 = `UPDATE punkty SET pkt = pkt + 10 WHERE userID = ${user}; `;
                    polacz.query(query_3, (err) => {
                      if (err) {
                        console.log(err);
                      }
                    });
                  } else {
                    // Użytkownik nie istnieje w bazie danych, wykonaj operację INSERT
                    const query_2 = `INSERT INTO punkty (id, userID, pkt, usrName) VALUES (NULL, ${user}, '10','${user2}');`;
                    polacz.query(query_2, (err) => {
                      if (err) {
                        console.log(err);
                      }
                    });
                  }
                });
                interaction.reply("Gratulacje Twoja odpowiedź jest: \n Dobra");
              }
            } else {
              interaction.reply("Przykro mi Twoja odpowiedź jest: BŁĘDNA \n Tracisz 5 punktów");
              const query_4 = `UPDATE punkty SET pkt = pkt - 5 WHERE userID = ${user}; `;
              polacz.query(query_4, (err) => {
                if (err) {
                  console.log(err);
                }
              });
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
          interaction.reply('wystąpił błąd');
        });
      } else {
        interaction.reply('Wystąpił błąd brak danych w bazie danych');
      }
    });
  },
};