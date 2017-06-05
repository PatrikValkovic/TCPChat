/**
 * 05.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Command = require('./Command')

class JoinedCommands extends  Command {

    can(content){
        return content.startsWith('/joined')
    }

    process(client, content){
        if (Object.keys(client.joinedGroups()).length === 0) {
            client.socket.write('You are not in any group\n')
            return
        }
        client.socket.write('List of groups\n')
        for (const grp of Object.keys(client.joinedGroups()))
            client.socket.write(`/${grp} ${client.groups[grp].name}\n`)
    }

}

module.exports = JoinedCommands
