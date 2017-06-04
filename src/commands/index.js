/**
 * 04.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'


let commands = []


module.exports = function (client, content) {

    for(let command of commands)
        if(command.can(content))
            return command.process(client,content)

    return false
}
