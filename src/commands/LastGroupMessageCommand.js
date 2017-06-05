/**
 * 04.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Command = require('./Command')

class LastGroupMessageCommand extends Command {

    can(content){
        return true
    }

    process(client, content){

    }

}

module.exports = LastGroupMessageCommand