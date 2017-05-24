/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

module.exports = class Group {
    constructor(name, index) {
        this.name = name
        this.__clients = []
        this.index = index
    }

    addClient(client) {
        this.__clients.push(client)
        client.groups[this.name] = this.index
    }

    removeClient(client) {
        const index = this.__clients.findIndex((c) => {
            return client.id === c.id
        })
        if (index < 0)
            return false

        let oldArraySize = this.__clients.length
        this.__clients.splice(index, 1)
        delete client.groups[this.name]
        return oldArraySize !== this.__clients.length
    }

    send(fromClient, message) {
        const mess = `[${this.name}]\t<${fromClient.name}>\t${message}`
        this.__clients = this.__clients.filter((c)=>{
            return c.connected === true
        })
        for (let i in this.__clients)
            if (this.__clients[i].id !== fromClient.id)
                this.__clients[i].socket.write(mess)
    }
}