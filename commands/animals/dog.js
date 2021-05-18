const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const fetch = require(`node-fetch`)

module.exports = class DogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dog',
            group: 'animals',
            memberName: 'dog',
            description: 'Sends a random dog image.',
            guarded: true,
        });
    }
    async run(msg) {
        await fetch(`https://some-random-api.ml/img/dog`)
            .then(r => r.json())
            .then(d => msg.embed(new MessageEmbed().setTitle(`Dog`).setImage(d.link).setColor("RANDOM")))
    }
}