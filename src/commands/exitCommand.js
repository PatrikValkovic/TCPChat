/**
 * 04.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Command = require('./Command')

class ExitCommand extends Command {

    can(content){
        return content.startsWith('/exit')
    }

    process(client, content){
        client.disconnect()
    }

}

module.exports = new ExitCommand()