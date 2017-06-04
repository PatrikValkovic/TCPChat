/**
 * 04.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const HelpCommand = require('./HelpCommand')

let commands = []

commands.push(HelpCommand)

module.exports = function (client, content) {

    for(let command of commands)
        if(command.can(content))
            return command.process(client,content)

    return false
}
