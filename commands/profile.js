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
                let bBal = data.Bank
                if (bBal < 0 || bBal == 0) {
                    bBal = "No money found."
                }
                let bal = data.Coins
                if (!bal) bal = "They don't have a job yet."
                else {
                    bal = formatNumber(data.Coins)
                }
                let income = data.Job[0].income
                if (!income) income = "No income found."
                else {
                    income = formatNumber(data.Job[0].income)
                }
                return msg.embed(
                    new MessageEmbed()
                        .setTitle(`\`${user.tag}\`'s Profile`)
                        .setThumbnail(msg.guild.iconURL({ dynamic: true }))
                        .setColor("RANDOM")
                        .addField(`Job`, data.Job[0].job || "They don't have a job yet.", true)
                        .addField(`Income`, income, true)
                        .addField(`Wallet Balance`, bal, true)
                        .addField(`Bank Balance`, bBal, true)
                )
            }
        })
    }
}