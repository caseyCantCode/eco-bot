const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const jobs = ["taxi", "doctor", "clickbaiter", "coder", "gamer", "webdev", "only-fans-girl", "clock-maker", "uwu", "game-maker"]

module.exports = class ViewCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'view',
            aliases: [`v`],
            group: 'eco',
            memberName: 'view',
            description: 'View the jobs',
            guarded: true,
        });
    }
    async run(msg) {
        msg.embed(
            new MessageEmbed()
                .setTitle(`Job List!`)
                .setColor("RANDOM")
                .setDescription(jobs.join("\n"))
        )
    }
}