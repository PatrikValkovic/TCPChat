/**
 * 04.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Command = require('./Command')
const helpMessage = require('./helpMessage')

class LastGroupMessageCommand extends Command {

    constructor(manager){
        super()
        this.manager = manager
    }

    can(content){
        return true
    }

    process(client, content){
        if(client.lastGroup !== null)
            return client.lastGroup.send(client, content, this.manager.width)
        client.socket.write(helpMessage)
    }

}

module.exports = LastGroupMessageCommand