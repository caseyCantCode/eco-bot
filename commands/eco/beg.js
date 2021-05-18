const Command = require('../Command');
const db = require(`../../models/Bal`)
const ms = require(`parse-ms`)

module.exports = class BegCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'beg',
            group: 'eco',
            memberName: 'beg',
            description: 'Beg for some money!',
            guarded: true,
        });
    }
    async run(msg) {
        const timeout = 3.6e+6
        var reward = Math.floor(Math.random() * 3000 + 1)

        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                if (random === true) {
                    new db({
                        UserID: msg.author.id,
                        GuildID: msg.guild.id,
                        WorkCooldown: 0,
                        DailyCooldown: 0,
                        Coins: reward,
                        BegCooldown: Date.now(),
                        HasFishingPoll: false,
                        HasGun: false
                    }).save()
                    return msg.reply(`sat down on the sidewalk and got **${reward}** coins!`)
                } else {
                    new db({
                        UserID: msg.author.id,
                        GuildID: msg.guild.id,
                        WorkCooldown: 0,
                        DailyCooldown: 0,
                        Coins: 0,
                        BegCooldown: Date.now(),
                        HasFishingPoll: false,
                        HasGun: false
                    }).save()
                    return msg.reply(`sat down on the sidewalk and didn't get anything ;-;`)
                }
            } else if (data) {
                if (timeout - (Date.now() - data.BegCooldown) > 0) {
                    let time = ms(timeout - (Date.now() - data.BegCooldown))
                    return msg.reply(`please wait **${time.hours}**H **${time.minutes}**M **${time.seconds}**S`)
                } else {
                    if (random === true) {
                        data.Coins += reward
                        data.save()
                        return msg.reply(`sat down on the sidewalk and got **${reward}** coins!`)
                    } else {
                        return msg.reply(`sat down on the sidewalk and didn't get anything ;-;`)
                    }
                }
            }
        })
        function random() {
            const num = Math.floor(Math.random() * 3)
            return num === 1
        }
    }
}