/**
 * 04.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Command = require('./Command')

class MessageCommand extends Command {

    can(content){
        return content.startsWith('/')
    }

    process(client, content){
        const grpId = content.split(' ')[0].substr(1)
        if (isNaN(parseInt(grpId))) {
            client.socket.write('Invalid syntax "/<groupId> <message>"\n')
            return
        }
        const grp = this.manager.getGroupByIndex(grpId)
        if (grp === null) {
            client.socket.write('Non existing group, try /joined command\n')
            return
        }
        if (!client.isInGroup(grp.name)) {
            client.socket.write(`You are not in ${grp.name} group\n`)
            return
        }
        grp.send(client, content.substr(2 + grpId.toString().length))
    }

}

module.exports = MessageCommand