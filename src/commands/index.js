/**
 * 04.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const groupManager = require('../groupManager')
const ExitCommand = require('./ExitCommand')
const HelpCommand = require('./HelpCommand')
const GroupsCommand = require('./GroupsCommand')

let commands = []

commands.push(new ExitCommand())
commands.push(new HelpCommand())
commands.push(new GroupsCommand(groupManager))

module.exports = function (client, content) {

    for(let command of commands)
        if(command.can(content))
            return command.process(client,content)

    return false
}
