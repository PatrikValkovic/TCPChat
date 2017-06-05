/**
 * 05.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Command = require('./Command')

class SetnameCommand extends  Command {

    can(content){
        return content.startsWith('/setname')
    }

    process(client, content){
        const split = content.split(' ')
        if (split.length !== 2) {
            client.socket.write('Invalid syntax: /setname <yourName>\n')
            return
        }
        client.name = split[1].trim()
    }

}

module.exports = SetnameCommand