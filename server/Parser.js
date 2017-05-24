/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const net = require('net')
const log = require('../shared/logger')

module.exports = class Parser
{
    constructor(manager){
        this.manager = manager
    }

    /**
     *
     * @param {net.Socket} socket
     * @param {string} content
     */
    parse(socket, client, content){

        if(content.startsWith('/groups')){
            socket.write('List of groups:\n')
            const groups = this.manager.getGroupsNames()
            for(let i=0;i<groups.length;i++)
                socket.write(`/${i} ${groups[i]}\n`)
        }


        else if(content.startsWith('/exit')){
            log.info('Client exiting')
            socket.destroy()
        }


        else if(content.startsWith('/joined')){
            if(Object.keys(client.groups).length === 0) {
                socket.write('You are not in any group\n')
                return
            }
            socket.write('List of groups\n')
            for(const grp in client.groups)
                    socket.write(`/${client.groups[grp]} ${grp}\n`)
        }


        else if(content.startsWith('/join')){
            const splitted = content.split(' ');
            if(splitted.length !== 2){
                socket.write('Invalid syntax: /join <groupName|groupId>\n')
                return
            }
            const grp = isNaN(parseInt(splitted[1])) ?
                this.manager.getGroupByName(splitted[1].trim()) :
                this.manager.getGroupByIndex(parseInt(splitted[1]))
            if(grp === null){
                socket.write('Non existing group, try /groups to list all groups\n')
                return
            }
            grp.addClient(client)

            socket.write(`Joined ${grp.name} group\n`)
        }


        else if(content.startsWith('/leave')){
            const splitted = content.split(' ');
            if(splitted.length !== 2){
                socket.write('Invalid syntax: /leave <groupName|groupId>\n')
                return
            }
            const grp = isNaN(parseInt(splitted[1])) ?
                this.manager.getGroupByName(splitted[1].trim()) :
                this.manager.getGroupByIndex(parseInt(splitted[1]))
            if(grp === null){
                socket.write('Non existing group, try /joined to list all joined groups\n')
                return
            }
            if(grp.removeClient(client))
                socket.write(`Leaved ${grp.name} group\n`)
            else
                socket.write(`You are not in ${grp.name} group\n`)
        }

        else if(content.startsWith('/create')){
            const splitted = content.split(' ');
            if(splitted.length !== 2){
                socket.write('Invalid syntax: /create <groupName>\n')
                return
            }
            const grp = this.manager.createGroup(splitted[1].trim());
            grp.addClient(client)
            socket.write(`You are now in ${grp.name} group\n`)
        }
    }
}