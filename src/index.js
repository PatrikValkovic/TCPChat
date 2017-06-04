/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const net = require('net')
const log = require('./logger')
const config = require('../config.json')
const GroupManager = require('./GroupManager')
const Parser = require('./Parser')
const Client = require('./Client')

if (require.main === module) {
    let counter = 10
    const grpManager = new GroupManager(config.defaultGroups)
    const parser = new Parser(grpManager)
    const server = net.createServer()

    server.on('connection', (socket) => {
        const client = new Client(socket, counter++)
        log.info('Client connected')
        socket.on('close', () => {
            log.info('Socket ended')
            client.disconnect()
        })
        socket.once('data', (name) => {
            client.name = name
            socket.write('Welcome to chat, type /help for more help\n')
            socket.on('data',(content) => {
                parser.parse(client, content.toString())
            })
        })
        socket.on('error', () => {
            log.warning('Error with socket')
            client.disconnect()
        })

        socket.write('Please enter your name: ')
    })

    server.listen(config.port, config.host, () => {
        const address = server.address()
        log.info(`Server running on ${address.address}:${address.port}`)
    })
}
