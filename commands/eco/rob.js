const Command = require('../Command');
const db = require(`../../models/Bal`)

module.exports = class RobCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rob',
            aliases: [`bully`, `steal`],
            group: 'eco',
            format: '<user>',
            memberName: 'rob',
            description: 'Rob a user.',
            guarded: true,
            args: [
                {
                    key: "tryrob",
                    prompt: "What user would you like to rob?",
                    type: "user"
                }
            ],
            throttling: {
                usages: 1,
                duration: 18000
            }
        });
    }
    async run(msg, { tryrob }) {
        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                return msg.reply(`you do not have any coins.`)
            } else if (data) {
                const coins = Math.floor(Math.random() * data.Coins) + 1;
                await db.findOne({ UserID: tryrob.id }, async (err1, userData) => {
                    if (err1) throw err1
                    if (!userData) {
                        if (random() === true) {
                            new db({
                                GuildID: msg.guild.id,
                                UserID: tryrob.id,
                                WorkCooldown: 0,
                                DailyCooldown: 0,
                                Coins: -coins,
                                BegCooldown: 0,
                                HasFishingPoll: false,
                                HasGun: false
                            }).save()
                            data.Coins += coins
                            data.save()
                            return msg.reply(`you robbed **${tryrob.tag}** for **${coins}** coins!`)
                        } else {
                            new db({
                                GuildID: msg.guild.id,
                                UserID: tryrob.id,
                                WorkCooldown: 0,
                                DailyCooldown: 0,
                                Coins: coins,
                                BegCooldown: 0,
                                HasFishingPoll: false,
                                HasGun: false
                            }).save()
                            data.Coins -= coins
                            data.save()
                            return msg.reply(`you were caught robbing **${tryrob.tag}** amd you had tp pay them **${coins}** coins!`)
                        }
                    } else if (userData) {
                        if (random() === true) {
                            data.Coins += coins
                            data.save()
                            userData.Coins -= coins
                            userData.save()
                            return msg.reply(`you robbed **${tryrob.tag}** for **${coins}** coins!`)
                        } else {
                            data.money -= coins
                            data.save()
                            userData.money += coins
                            userData.save()
                            return msg.reply(`you were caught robbing **${tryrob.tag}** amd you had tp pay them **${coins}** coins!`)
                        }
                    }
                })
            }
        })
        function random() {
            const num = Math.floor(Math.random() * 3)
            return num === 1
        }
    }
}