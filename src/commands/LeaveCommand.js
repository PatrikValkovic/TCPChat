/**
 * 05.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Command = require('./Command')

class LeaveCommand extends  Command {

    can(content){
        return content.startsWith('/leave')
    }

    process(client, content){
        const split = content.split(' ')
        if (split.length !== 2) {
            client.socket.write('Invalid syntax: /leave <groupName|groupId>\n')
            return
        }

        split[1] = split[1].trim()
        let grp = null
        if(isNaN(parseInt(split[1])))
            grp = client.groupByName(split[1])
        else
            grp = client.groupById(parseInt(split[1]))

        if (grp === null) {
            client.socket.write('Non existing group, try /joined to list all joined groups\n')
            return
        }
        if (grp.removeClient(client))
            client.socket.write(`Leaved ${grp.name} group\n`)
        else
            client.socket.write(`You are not in ${grp.name} group\n`)
    }

}

module.exports = LeaveCommand