const Command = require('../Command');
const db = require(`../../models/Bal`)
const ms = require(`parse-ms`)

module.exports = class DailyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'daily',
            aliases: [`d`],
            group: 'eco',
            memberName: 'daily',
            description: 'Collect your daily money!',
            guarded: true,
        });
    }
    async run(msg) {
        const timeout = 8.64e+7
        var reward = Math.floor(Math.random() * 1000 + 1)

        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                new db({
                    UserID: msg.author.id,
                    GuildID: msg.guild.id,
                    WorkCooldown: 0,
                    DailyCooldown: Date.now(),
                    Coins: reward,
                    BegCooldown: 0,
                    HasFishingPoll: false,
                    HasGun: false
                }).save()
                return msg.reply(`collected there daily reward and got **${reward}** coins!`)
            } else if (data) {
                if (timeout - (Date.now() - data.DailyCooldown) > 0) {
                    let time = ms(timeout - (Date.now() - data.DailyCooldown))
                    return msg.reply(`please wait **${time.hours}**H **${time.minutes}**M **${time.seconds}**S`)
                } else {
                    data.Coins += reward
                    data.DailyCooldown = Date.now()
                    data.save()
                    return msg.reply(`collected there daily reward and got **${reward}** coins!`)
                }
            }
        })
    }
}