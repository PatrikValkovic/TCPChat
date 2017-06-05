/**
 * 04.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Command = require('./Command')
const helpMessage = require('./helpMessage')

class HelpCommand extends Command {

    can(content){
        return content.startsWith('/help')
    }

    process(client, content){
        client.socket.write(helpMessage)
    }

}

module.exports = HelpCommand