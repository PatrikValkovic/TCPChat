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

if(require.main === module)
{
    const server = net.createServer()

    server.on('connection',(socket) => {

    })

    server.listen(config.port,config.host,()=>{
        const address = server.address()
        Log.info(`Server running on ${address.address}:${address.port}`)
    })
}
