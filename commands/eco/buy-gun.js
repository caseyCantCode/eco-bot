const Command = require('../Command');
const db = require(`../../models/Bal`)

module.exports = class BuyGunPollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'buy-gun',
            aliases: [`buygun`, `gun`],
            group: 'eco',
            memberName: 'buy-gun',
            description: 'Buys a gun',
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
                return msg.reply(`you don't have any coins to buy a gun.`)
            } else if (data.HasGun === true) return msg.reply(`already have a gun.`)
            else if (data.Coins < 1000) return msg.reply(`you don't have enough to buy a gun.`)
            data.HasGun = true
            data.Coins -= 1000
            data.save()
            return msg.reply(`has bought a gun for **1000** coins!`)
        })
    }
}