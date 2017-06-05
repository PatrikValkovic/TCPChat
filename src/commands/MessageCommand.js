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
        const split = content.split(' ')
        if (split.length < 2 || isNaN(parseInt(split[0].substr(1)))) {
            client.socket.write('Invalid syntax "/<groupId> <message>"\n')
            return
        }
        const grp = client.groupById(parseInt(split[0].substr(1)))
        if (grp === null) {
            client.socket.write('Non existing group, try /joined command\n')
            return
        }
        grp.send(client, content.substr(2 + grp.id.toString().length))
    }

}

module.exports = MessageCommand