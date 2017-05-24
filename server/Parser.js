/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const log = require('../shared/logger')

module.exports = class Parser
{
    constructor(manager){
        this.manager = manager
    }

    parse(socket, content){
        let ret = ''
        if(content.startsWith('/groups')){
            const groups = this.manager.getGroups()
            for(let i=0;i<groups.length;i++)
                ret += `/${i} ${groups[i]}\n`
            socket.write(ret)
        }
        if(content.startsWith('/exit')){
            log.info('Client exiting')
            socket.destroy()
        }
    }
}