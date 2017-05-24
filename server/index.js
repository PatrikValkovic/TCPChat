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
const Client = require('./Client')

if(require.main === module)
{
    let counter = 10
    const grpManager = new GroupManager(config.defaultGroups)
    const server = net.createServer()

    server.on('connection',(socket) => {
        const client = new Client(socket,counter++)
        socket.on('end',()=>{
            client.disconnect()
        })
        socket.on('data',(cont)=>{
            const req = JSON.parse(cont.toString())
            console.log(cont)
        })
    })

    server.listen(config.port,config.host,()=>{
        const address = server.address()
        Log.info(`Server running on ${address.address}:${address.port}`)
    })
}
