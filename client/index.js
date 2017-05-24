/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const net = require('net')
const config = require('../config.json')

let name
if (require.main === module) {
    console.log('Please enter your name:')
    var stdin = process.openStdin()
    const nameFn = (text) => {
        name = text
        stdin.removeListener('data',nameFn)

        const socket = net.connect(config.port, config.host)
        stdin.on('data',(content) => {
            socket.write(content.toString().trim())
            if(content.toString().startsWith('/exit')){
                socket.destroy()
                process.exit()
            }
        })
        socket.on('data',(content) => {
            console.log(content.toString())
        })
        socket.write(`/setname ${name}`)
    }
    stdin.on('data',nameFn)

}