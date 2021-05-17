const { Command } = require('discord.js-commando');

module.exports = class SummoNComamnd extends Command {
    constructor(client, info) {
        if (!info.argsPromptLimit) info.argsPromptLimit = 2;
        super(client, info);

        this.argsSingleQuotes = info.argsSingleQuotes || false;
        this.throttling = info.throttling || { usages: 2, duration: 5 };
    }
};