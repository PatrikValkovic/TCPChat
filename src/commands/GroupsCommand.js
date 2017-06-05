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
        for(const i of Object.keys(groups))
            client.socket.write(`/${groups[i].id} ${groups[i].name}\n`)
    }

}

module.exports = GroupsCommand