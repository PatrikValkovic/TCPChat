/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

let counter = 0

/**
 * Class that represent chat group
 * @type {Group}
 */
module.exports = class Group {

    /**
     * Constructor
     * @param {string} name Name of group
     * @param {int} index Short index for group
     */
    constructor(name) {
        this.name = name
        this.__clients = {}
        this.id = counter++
    }

    /**
     * Add client into group
     * @param {Client} client
     */
    addClient(client) {
        this.__clients.push(client)
        client.groups[this.name] = this.index
    }

    /**
     * Remove client from group
     * @param {Client} client Client to remove
     * @returns {boolean} True if was client removed, false otherwise
     */
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

    /**
     * Send message to group
     * @param {Client} fromClient Client, that send message
     * @param {string} message Message to send
     */
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