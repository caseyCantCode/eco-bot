const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const fetch = require(`node-fetch`)

module.exports = class CatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            group: 'animals',
            memberName: 'cat',
            description: 'Sends a random cat image.',
            guarded: true,
        });
    }
    async run(msg) {
        await fetch(`https://some-random-api.ml/img/cat`)
            .then(r => r.json())
            .then(d => msg.embed(new MessageEmbed().setTitle(`Cat`).setImage(d.link).setColor("RANDOM")))
    }
}