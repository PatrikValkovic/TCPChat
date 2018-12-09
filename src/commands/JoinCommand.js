/**
 * 05.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Command = require('./Command')

class JoinCommand extends  Command {

    constructor(manager){
        super()
        this.manager = manager
    }

    can(content){
        return content.startsWith('/join')
    }

    process(client, content){
        const split = content.split(' ')
        if (split.length !== 2) {
            client.socket.write('Invalid syntax: /join <groupName|groupId>\n')
            return
        }
        const grp = isNaN(parseInt(split[1])) ?
            this.manager.getGroupByName(split[1].trim()) :
            this.manager.getGroupByIndex(parseInt(split[1]))
        if (grp === null) {
            client.socket.write('Non existing group, try /groups to list all groups\n')
            return
        }
        grp.addClient(client)
        client.lastGroup = grp

        client.socket.write(`Joined ${grp.name} group\n`)
    }

}

module.exports = JoinCommand