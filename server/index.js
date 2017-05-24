    /**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const net = require('net')
const Log = require('../shared/logger')
const config = require('../config.json')
const GroupManager = require('./GroupManager')
const Parser = require('./Parser')
const Client = require('./Client')

if(require.main === module)
{
    let counter = 10
    const grpManager = new GroupManager(config.defaultGroups)
    const parser = new Parser(grpManager)
    const server = net.createServer()

    server.on('connection',(socket) => {
        const client = new Client(socket,counter++)
        socket.on('end',()=>{
            client.disconnect()
        })
        socket.on('data',(cont)=>{
            parser.parse(cont.toString())
        })
    })

    server.listen(config.port,config.host,()=>{
        const address = server.address()
        Log.info(`Server running on ${address.address}:${address.port}`)
    })
}
