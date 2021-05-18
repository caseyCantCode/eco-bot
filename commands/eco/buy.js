const Command = require('../Command');
const guildDb = require(`../../models/Guild`)
const db = require(`../../models/Bal`)

module.exports = class BuyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'buy',
            aliases: ['b'],
            group: 'eco',
            format: '<item>',
            memberName: 'buy',
            description: 'Buys a item from the shop.',
            guarded: true,
            args: [
                {
                    key: "item",
                    prompt: "Please send the item you wish to buy\nRun the \`shop\` command to see prices.",
                    type: "string"
                }
            ]
        });
    }
    async run(msg, { item }) {
        try {
            await db.findOne({ UserID: msg.author.id }, async (err1, userData) => {
                if (err1) throw err1
                if (!userData) {
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
                    return msg.reply(`you don't have any coins!`)
                } else if (userData) {
                    await guildDb.findOne({ GuildID: msg.guild.id }, async (err, data) => {
                        if (err) throw err
                        if (!data) return msg.reply(`invalided shop item.`)
                        else if (data) {
                            const shopItem = data.CustomShopItems
                                .find(c => c.item.toLowerCase() === item)
                            if (!shopItem) return msg.reply(`invalided shop item.`)

                            if (!data.Coins) {
                                if (shopItem.price > data.Bank) return msg.reply(`you don't have enough coins for this item!`)
                            } else {
                                if (!shopItem.price > data.Coins) return msg.reply(`you don't have enough coins for this item!`)
                            }

                            if (!data.Coins && data.Bank > 0) {
                                userData.Bank -= shopItem.price
                                userData.Items.push({
                                    items: shopItem.item
                                })
                                userData.save()
                                return msg.reply(`successfully bought **${shopItem.item}**!`)
                            } else {
                                userData.Coins -= shopItem.price
                                userData.Items.push({
                                    items: shopItem.item
                                })
                                userData.save()
                                return msg.reply(`successfully bought **${shopItem.item}**!`)
                            }
                        }
                    })
                }
            })
        } catch (e) {
            return msg.reply(`invalid item.`)
        }
    }
}