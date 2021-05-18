const Command = require('../Command');

module.exports = class TriggerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'trigger',
            aliases: [`triggered`],
            group: 'meme',
            memberName: 'trigger',
            description: 'Trigger someone!',
            guarded: true,
            args: [
                {
                    key: "user",
                    prompt: "",
                    type: "user",
                    default: m => m.author
                }
            ]
        });
    }
    async run(msg, { user }) {
        const attachment = `https://summonjs.xyz/api/trigger?image=${user.avatarURL({ format: "png" })}`
        msg.channel.send({ files: [{ name: "trigger.gif", attachment }] })
    }
}