const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const db = require(`../../models/Bal`)

module.exports = class ItemsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'items',
            aliases: [`it`],
            group: 'eco',
            memberName: 'items',
            description: 'Get a users items.',
            guarded: true,
            args: [
                {
                    key: "user",
                    prompt: "What user would you like?",
                    type: "user",
                    default: m => m.author
                }
            ]
        });
    }
    async run(msg, { user }) {
        await db.findOne({ UserID: user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                new db({
                    UserID: msg.author.id,
                    GuildID: msg.guild.id,
                    WorkCooldown: 0,
                    DailyCooldown: 0,
                    Coins: 0,
                    BegCooldown: 0,
                    HasFishingPoll: false,
                    HasGun: false
                }).save()
                return msg.reply(`that user doesn't have any economy data.`)
            } else if (!data.Items) {
                return msg.reply(`that user doesn't have any items.`)
            } else if (data && data.Items) {
                let fish;
                if (!data.Fishes[0]) {
                    fish = "No fishes"
                } else {
                    fish = data.Fishes.map((w, i) => `**${i + 1}.** ${w.fish}`)
                }
                let items;
                if (!data.Items[0]) {
                    items = "No items found."
                } else {
                    items = data.Items.map((w, i) => `**${i + 1}.** ${w.items}`)
                }
                const e = new MessageEmbed()
                    .setTitle(`\`${user.tag}\`'s Items`)
                    .setColor("RANDOM")
                    .addField(`Fishes`, fish)
                    .addField(`Items`, items)
                msg.embed(e)
            }
        })
    }
}