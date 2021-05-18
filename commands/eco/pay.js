const Command = require('../Command');
const db = require(`../../models/Bal`)

module.exports = class PayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pay',
            aliases: [`p`],
            group: 'eco',
            format: '<user> <amount>',
            memberName: 'pay',
            description: 'Pay a user an amount.',
            guarded: true,
            args: [
                {
                    key: "user",
                    prompt: "What user would you like to pay?",
                    type: "user"
                },
                {
                    key: "amount",
                    prompt: "How much would you like to pay?",
                    type: "integer"
                }
            ]
        });
    }
    async run(msg, { user, amount }) {
        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
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
                return msg.reply(`you don't have any coins to give!`)
            } else if (data) {
                if (!data.Coins) {
                    if (amount > data.Bank) return msg.reply(`you do not have **${amount}** in your coins!`)
                } else {
                    if (amount > data.Coins) return msg.reply(`you do not have **${amount}** in your coins!`)
                }
                await db.findOne({ UserID: user.id }, async (err1, userData) => {
                    if (err1) throw err1
                    if (!userData) {
                        if (!data.Coins && data.Bank > 0) {
                            data.Bank -= amount
                            data.save()
                            new db({
                                UserID: msg.author.id,
                                GuildID: user.id,
                                WorkCooldown: 0,
                                DailyCooldown: 0,
                                Coins: parseInt(amount),
                                BegCooldown: 0,
                                HasFishingPoll: false,
                                HasGun: false
                            }).save()
                            return msg.reply(`payed **${user.tag}** **${amount}** coins!`)
                        } else {
                            data.Bank -= amount
                            data.save()
                            new db({
                                UserID: msg.author.id,
                                GuildID: user.id,
                                WorkCooldown: 0,
                                DailyCooldown: 0,
                                Coins: parseInt(amount),
                                BegCooldown: 0,
                                HasFishingPoll: false,
                                HasGun: false
                            }).save()
                            return msg.reply(`payed **${user.tag}** coins **${amount}** coins!`)
                        }
                    } else if (userData) {
                        if (!data.Coins && data.Bank > 0) {
                            data.Bank -= amount
                            userData.coins += amount
                            data.save()
                            userData.save()
                            return msg.reply(`payed **${user.tag}** coins **${amount}** coins!`)
                        } else {
                            data.Coins -= amount
                            userData.Coins += amount
                            data.save()
                            userData.save()
                            return msg.reply(`payed **${user.tag}** coins **${amount}** coins!`)
                        }
                    }
                })
            }
        })
    }
}