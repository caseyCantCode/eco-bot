const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { util: { permissions } } = require('discord.js-commando');

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: [`h`],
            group: 'info',
            memberName: 'help',
            description: 'Sends the bots commands.',
            guarded: true,
            args: [
                {
                    key: "command",
                    type: "command",
                    default: () => "",
                    prompt: ""
                }
            ]
        });
    }
    async run(msg, { command }) {
        if (!command) {
            const e = new MessageEmbed()
                .setTitle(`My Commands`, this.client.user.avatarURL({ dynamic: true }))
                .setColor("RANDOM");
            for (const group of this.client.registry.groups.values()) {
                const commands = group.commands.filter(cmd => {
                    return true;
                });
                e.addField(group.name, commands.map(c => `\`${c.name}\``).join(" | "))
            }
            msg.embed(e)
        } else {
            try {
                const userPerms = command.userPermissions
                    ? command.userPermissions.map(perm => permissions[perm]).join(', ')
                    : 'None';
                const clientPerms = command.clientPermissions
                    ? command.clientPermissions.map(perm => permissions[perm]).join(', ')
                    : 'None';
                return msg.reply(stripIndents`
			**${command.name}**
			${command.description}${command.details ? `\n${command.details}` : ''}

			**Format** ${command.usage(command.format || '')}
			**Aliases** ${command.aliases.join(', ') || 'None'}
			**Group** ${command.group.name} (\`${command.groupID}:${command.memberName}\`)
			**Permissions You Need** ${userPerms}
			**Permissions I Need** ${clientPerms}
		`);
            } catch (e) {
                return msg.reply(`Invalid command.`)
            }
        }
    }
}