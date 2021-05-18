const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const db = require(`../../models/Bal`)
const { formatNumber } = require(`../../functions/util/Util`)

module.exports = class ProfileCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'profile',
            aliases: [`prof`],
            group: 'eco',
            memberName: 'profile',
            description: 'View someones profile.',
            guarded: true,
            args: [
                {
                    key: "user",
                    type: "user",
                    prompt: "What user do you want to view?",
                    default: m => m.author
                }
            ]
        });
    }
    async run(msg, { user }) {
        await db.findOne({ UserID: user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                return msg.reply(`that user doesn't have and economy data!`)
            } else if (data) {
                let job;
                let income;
                let bal;
                if (!data.Job[0] || data.Job[0] === null || data.Job[0] === undefined) {
                    income = "They don't have a job so no income."
                    job = "They don't have a job yet."
                } else {
                    income = formatNumber(data.Job[0].income)
                    job = data.Job[0].job
                }

                if (!data.Coins) {
                    bal = "They don't have any coins yet."
                } else {
                    bal = formatNumber(data.Coins)
                }
                return msg.embed(
                    new MessageEmbed()
                        .setTitle(`\`${user.tag}\`'s Profile`)
                        .setThumbnail(msg.guild.iconURL({ dynamic: true }))
                        .setColor("RANDOM")
                        .addField(`Wallet Balance`, bal, true)
                        .addField(`Job`, job, true)
                        .addField(`Income`, income, true)
                )
            }
        })
    }
}