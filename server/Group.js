/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

module.exports = class Group {
    constructor(name) {
        this.name = name
        this.__clients = []
    }

    addClient(client) {
        this.__clients.push(client)
        client.groups[this.name] = 1
    }

    removeClient(client) {
        const index = this.__clients.findIndex((c) => {
            return client.id === c.id
        })
        if(index < 0)
            return false

        let oldArraySize = this.__clients.length
        this.__clients.splice(index, 1)
        delete client.groups[this.name]
        return oldArraySize !== this.__clients.length
    }
}