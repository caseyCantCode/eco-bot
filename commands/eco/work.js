const Command = require('../Command');
const db = require(`../../models/Bal`)
const ms = require(`parse-ms`)

module.exports = class WorkCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'work',
            aliases: ["w"],
            group: 'eco',
            memberName: 'work',
            description: 'Work your ass off.',
            guarded: true,
        });
    }
    async run(msg) {
        const timeout = 1.8e+6
        var reward = Math.floor(Math.random() * 1000 + 1)

        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                new db({
                    UserID: msg.author.id,
                    GuildID: msg.guild.id,
                    WorkCooldown: Date.now(),
                    DailyCooldown: 0,
                    Coins: reward,
                    Bank: 0
                }).save()
                return msg.reply(`worked there f*cking ass off and earned **${reward}** coins!`)
            } else if (data) {
                if (timeout - (Date.now() - data.WorkCooldown) > 0) {
                    let time = ms(timeout - (Date.now() - data.WorkCooldown))
                    return msg.reply(`please wait **${time.hours}**H **${time.minutes}**M **${time.seconds}**S`)
                } else {
                    data.Coins += reward
                    data.WorkCooldown = Date.now()
                    data.save()
                    return msg.reply(`worked there f*cking ass off and earned **${reward}** coins!`)
                }
            }
        })
    }
}