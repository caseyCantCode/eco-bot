const { CommandoClient } = require("discord.js-commando")
const { connect } = require(`mongoose`)
const client = new CommandoClient({
    owner: "813875382972973088",
    commandPrefix: "a/",
    partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
    ws: {
        intents: ["GUILD_MEMBERS", "GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_PRESENCES", "GUILD_VOICE_STATES"]
    }
})

require("dotenv").config()
const { join } = require("path")
const { MongoClient } = require('mongodb');
const { MongoDBProvider } = require('commando-provider-mongo');

client.setProvider(
    MongoClient.connect(process.env.mongo)
        .then(client => new MongoDBProvider(client, 'myFirstDatabase'))
).catch(console.error);

client.registry
    .registerDefaultTypes()
    .registerTypesIn(join(__dirname, 'types'))
    .registerGroups([
        ["eco", "Economy"],
        ["info", "Info"],
        ["util", "Config"],
        ['animals', `Animals`],
        ['meme', `Meme`]
    ])
    .registerCommandsIn(join(__dirname, 'commands'))
    .registerDefaultCommands({
        help: false,
        commandState: false,
        eval: false,
        ping: false,
        prefix: true,
        unknownCommand: false
    });

client.on('ready', () => {
    connect(process.env.mongo, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => console.log(`Mongodb connected.`))
    console.log(`${client.user.username} is online in ${client.guilds.cache.size} guilds!`)
})

client.login(process.env.token)