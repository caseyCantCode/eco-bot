const Command = require(`../Command`)
const db = require(`../../models/Bal`)
const fishes = ["Albacore Tuna", "Alligator Gar", "Anchovies", "Angelfish", "Arapaima", "Baiji", "Banjo Catfish", "Barb", "Barracuda", "Barramundi Fish", "Basking Shark", "Beluga Sturgeon", "Black Marlin", "Blobfish", "Bluefin Tuna", "Bonito Fish", "Bowfin", "Butterfly Fish", "Carp", "Catfish", "Chimaera", "Chinese Paddlefish", "Cichlid", "Clownfish", "Codfish", "Coelacanth", "Discus", "Dragonfish", "Drum Fish", "Eel", "Electric Eel", "Fangtooth", "Fish", "Florida Gar", "Flounder", "Fluke Fish (summer flounder)", "Frilled Shark", "Gar", "Goblin Shark", "Great White Shark", "Grey Reef Shark", "Guppy", "Hagfish", "Hammerhead Shark", "Herring", "Horn Shark", "Immortal Jellyfish", "Jellyfish", "Krill", "Lamprey", "Lionfish", "Loach", "Longnose Gar", "Lungfish", "Manta Ray", "Megalodon", "Milkfish", "Molly", "Monkfish", "Moray Eel", "Nurse Shark", "Paddlefish", "Pike Fish", "Piranha", "Pufferfish", "Rockfish", "Salmon", "Sardines", "Sawfish", "Scorpion Fish", "Sea Dragon", "Sea Slug", "Sea Urchin", "Seahorse", "Shark", "Shrimp", "Siamese Fighting Fish", "Silver Dollar", "Skate Fish", "Skipjack Tuna", "Spiny Dogfish", "Sponge", "Spotted Gar", "Starfish", "Stingray", "Sturgeon", "Sucker Fish", "Swai Fish", "Tang", "Tarpon", "Tetra", "Tiger Shark", "Toadfish", "Tuna", "Walleye Fish", "Whale Shark", "Wolf Eel", "Wolffish", "Wrasse", "Yellowfin Tuna", "Zebra Shark"]

module.exports = class FishCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fish',
            group: 'eco',
            memberName: 'fish',
            description: 'Go fishing',
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
                return msg.reply(`you don't have a fishing poll.`)
            } else if (data.HasFishingPoll === false) {
                return msg.reply(`you don't have a fishing poll.`)
            }

            const fish = fishes[Math.floor(Math.random() * fishes.length)]

            if (data.Fishes[0]) {
                data.Fishes.push({
                    fish
                })
                data.save()
                return msg.reply(`you caught a **${fish}**`)
            } else {
                data.Fishes = [{
                    fish
                }]
                data.save()
                return msg.reply(`you caught a **${fish}**`)
            }
        })
    }
}