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
        let ret = ''
        if(content.startsWith('/groups')){
            ret += 'List of groups:\n'
            const groups = this.manager.getGroupsNames()
            for(let i=0;i<groups.length;i++)
                ret += `/${i} ${groups[i]}\n`
            socket.write(ret)
        }
        if(content.startsWith('/exit')){
            log.info('Client exiting')
            socket.destroy()
        }
        if(content.startsWith('/join')){
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
    }
}