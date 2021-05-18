const Command = require('../Command');
const db = require(`../../models/Bal`)
const fishes = require(`../../functions/animals.json`)

module.exports = class FishCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hunt',
            group: 'eco',
            memberName: 'hunt',
            description: 'Go hunting',
            guarded: true,
            throttling: {
                usages: 1,
                duration: 2700
            }
        });
    }
    async run(msg) {
        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                return msg.reply(`you don't have a gun.`)
            } else if (data.HasGun === false) {
                return msg.reply(`you don't have a gun.`)
            }

            const animal = fishes[Math.floor(Math.random() * fishes.length)]

            if (data.Animals[0]) {
                data.Animals.push({
                    animal
                })
                data.save()
                return msg.reply(`you killed a **${animal}**`)
            } else {
                data.Animals = [{
                    animal
                }]
                data.save()
                return msg.reply(`you killed a **${animal}**`)
            }
        })
    }
}