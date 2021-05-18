const Command = require('../Command');

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: [`pong`],
            group: 'info',
            memberName: 'ping',
            description: 'Gets the bots ping!',
            guarded: true,
        });
    }
    async run(msg) {
        const m = await msg.channel.send(`Pinging...`)
        let ping = m.createdTimestamp - msg.createdTimestamp;
        m.edit(
            `🏓 Bot ping: \`${this.client.ws.ping}\`ms\nMessage ping: \`${ping}\`ms`
        )
    }
}