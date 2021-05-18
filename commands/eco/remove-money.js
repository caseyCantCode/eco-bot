const Command = require('../Command');
const db = require(`../../models/Bal`)

module.exports = class RemoveMoneyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'remove-money',
            aliases: [`removemoney`, `rm`],
            group: 'eco',
            format: '<user> <amount>',
            memberName: 'remove-money',
            description: 'Removes money to a user',
            guarded: true,
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    key: "user",
                    prompt: "What user would you like to add money to?",
                    type: "user"
                },
                {
                    key: "amount",
                    prompt: "How much would you like to add?",
                    type: "integer"
                }
            ]
        });
    }
    async run(msg, { user, amount }) {
        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
            if (err) throw err
            await db.findOne({ UserID: user.id }, async (err1, userData) => {
                if (err1) throw err1
                if (!data) {
                    if (!userData) {
                        new db({
                            UserID: user.id,
                            GuildID: msg.guild.id,
                            WorkCooldown: 0,
                            DailyCooldown: 0,
                            Coins: -parseInt(amount),
                            BegCooldown: 0,
                            HasFishingPoll: false,
                            HasGun: false
                        }).save()
                        return msg.reply(`removed **${amount}** coins from **${user.tag}**`)
                    } else if (userData) {
                        userData.coins -= amount
                        userData.save()
                        return msg.reply(`removed **${amount}** coins from **${user.tag}**`)
                    }
                } else if (data) {
                    if (!userData) {
                        new db({
                            UserID: user.id,
                            GuildID: msg.guild.id,
                            WorkCooldown: 0,
                            DailyCooldown: 0,
                            Coins: -parseInt(amount),
                            BegCooldown: 0,
                            HasFishingPoll: false,
                            HasGun: false
                        }).save()
                        return msg.reply(`removed **${amount}** coins from **${user.tag}**`)
                    } else if (userData) {
                        userData.Coins -= amount
                        userData.save()
                        return msg.reply(`removed **${amount}** coins from **${user.tag}**`)
                    }
                }
            })
        })
    }
}