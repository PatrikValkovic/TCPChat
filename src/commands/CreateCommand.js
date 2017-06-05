/**
 * 05.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Command = require('./Command')

class CreateCommand extends  Command {

    constructor(manager){
        super()
        this.manager = manager
    }

    can(content){
        return content.startsWith('/create')
    }

    process(client, content){
        const split = content.split(' ')
        if (split.length !== 2) {
            client.socket.write('Invalid syntax: /create <groupName>\n')
            return
        }
        const grp = this.manager.createGroup(split[1].trim())
        grp.addClient(client)
        client.socket.write(`Group ${grp.name} create and you are in\n`)
    }

}

module.exports = CreateCommand