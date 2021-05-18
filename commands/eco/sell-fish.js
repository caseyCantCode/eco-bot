const Command = require('../Command');
const db = require(`../../models/Bal`)

module.exports = class SellFishCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sell-fish',
            group: 'eco',
            format: '<fish name>',
            memberName: 'sell-fish',
            description: 'Sell a fish.',
            guarded: true,
            args: [
                {
                    key: "fish",
                    type: "string",
                    prompt: "What fish would you like to sell?"
                }
            ]
        });
    }
    async run(msg, { fish }) {
        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                return msg.reply(`you don't have have any economy data.`)
            } else if (data.HasFishingPoll === false) {
                return msg.reply(`you don't have a fishing poll so there for you can't sell any fish!`)
            } else if (!data.Fishes[0]) return msg.reply(`you don't have any fishes!`)

            const foundFish = data.Fishes.find(f => f.fish.toLowerCase() === fish.toLowerCase())
            if (!foundFish) return msg.reply(`invalid fish.`)
            const reward = Math.floor(Math.random() * 5000 + 1)
            data.Fishes = data.Fishes.filter(x => x.fish.toLowerCase() !== fish.toLowerCase())
            data.Coins += reward
            data.save()
            return msg.reply(`you sold **${foundFish.fish}** for **${reward}** coins!`)
        })
    }
}