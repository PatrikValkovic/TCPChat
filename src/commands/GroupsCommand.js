/**
 * 04.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Command = require('./Command')

class GroupsCommand extends  Command {

    constructor(grpManager){
        super()
        this.grpManager = grpManager
    }

    can(content){
        return content.startsWith('/groups')
    }

    process(client, content){
        client.socket.write('List of groups:\n')
        const groups = this.grpManager.getGroupsNames()
        for (let i = 0; i < groups.length; i++)
            client.socket.write(`/${i} ${groups[i]}\n`)
    }

}

module.exports = GroupsCommand