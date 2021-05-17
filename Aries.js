const { CommandoClient } = require("discord.js-commando")
const client = new CommandoClient({
    owner: "813875382972973088",
    commandPrefix: ",,",
    partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
    ws: {
        intents: ["GUILD_MEMBERS", "GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_PRESENCES", "GUILD_VOICE_STATES"]
    }
})

require("dotenv").config()
const { join } = require("path")

client.registry
    .registerDefaultTypes()
    .registerTypesIn(join(__dirname, 'types'))
    .registerGroups([
        ["eco", "eco commands"]
    ])
    .registerCommandsIn(join(__dirname, 'commands'))
    .registerDefaultCommands({
        help: false,
        commandState: false,
        eval: false,
        ping: false,
        prefix: false,
        unknownCommand: false
    });

["events"].map(h => require(`./handlers/${h}`)(client))

client.login(process.env.token)