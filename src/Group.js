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
        this.__clients[client.id.toString()] = client
        client.groups[this.id.toString()] = this
    }

    /**
     * Remove client from group
     * @param {Client} client Client to remove
     * @returns {boolean} True if was client removed, false otherwise
     */
    removeClient(client) {
        if(this.__clients[client.id.toString()].id !== client.id)
            return false

        delete client.groups[this.id.toString()]
        delete this.__clients[client.id.toString()]
        return true;
    }

    /**
     * Send message to group
     * @param {Client} fromClient Client, that send message
     * @param {string} message Message to send
     */
    send(fromClient, message) {
        const mess = `[${this.name}]\t<${fromClient.name}>\t${message}`

        for (let i of Object.keys(this.__clients))
            if (this.__clients[i].id !== fromClient.id)
                this.__clients[i].socket.write(mess)
    }
}