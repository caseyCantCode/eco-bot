const Command = require('../Command');
const db = require(`../../models/Bal`)

module.exports = class BuyFishingPollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'buy-fishing-poll',
            aliases: [`buyfishinpoll`, `fishingpoll`],
            group: 'eco',
            memberName: 'buy-fishing-poll',
            description: 'Buys a fishing poll.',
            guarded: true,
        });
    }
    async run(msg) {
        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
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
                return msg.reply(`you don't have any coins to buy a fishing poll.`)
            } else if (data.HasFishingPoll === true) return msg.reply(`already have a fishing poll.`)
            else if (data.Coins < 1000) return msg.reply(`you don't have enough to buy the fishing poll.`)
            data.HasFishingPoll = true
            data.Coins -= 1000
            data.save()
            return msg.reply(`has bought a fishing poll for **1000** coins!`)
        })
    }
}