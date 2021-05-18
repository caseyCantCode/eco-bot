const Command = require('../Command');
const db = require(`../../models/Bal`)

module.exports = class SellFishCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sell-animal',
            group: 'eco',
            format: '<animal name>',
            memberName: 'sell-anime',
            description: 'Sell a animal.',
            guarded: true,
            args: [
                {
                    key: "animal",
                    type: "string",
                    prompt: "What animal would you like to sell?"
                }
            ]
        });
    }
    async run(msg, { animal }) {
        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                return msg.reply(`you don't have have any economy data.`)
            } else if (data.HasGun === false) {
                return msg.reply(`you don't have a gun so there for you can't sell any animals!`)
            } else if (!data.Animals[0]) return msg.reply(`you don't have any animals!`)

            const foundFish = data.Animals.find(f => f.animal.toLowerCase() === animal.toLowerCase())
            if (!foundFish) return msg.reply(`invalid fish.`)
            const reward = Math.floor(Math.random() * 5000 + 1)
            data.Animals = data.Animals.filter(x => x.animal.toLowerCase() !== animal.toLowerCase())
            data.Coins += reward
            data.save()
            return msg.reply(`you sold **${foundFish.animal}** for **${reward}** coins!`)
        })
    }
}