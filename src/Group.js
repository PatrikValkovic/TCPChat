/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const log = require('./logger')

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
        log.info(`Group ${this.name} with id ${this.id} created`)
    }

    /**
     * Add client into group
     * @param {Client} client Client to add
     */
    addClient(client) {
        this.__clients[client.id.toString()] = client
        client.groups[this.id.toString()] = this
        log.info(`User ${client.id} add into group ${this.id}`)
    }


    /**
     * Remove client from group
     * @param {Client} client Client to remove
     * @returns {boolean} True if was client removed, false otherwise
     */
    removeClient(client) {
        log.info(`Attempt to remove client ${client.id} from group ${this.id}`)
        if(this.__clients[client.id.toString()].id !== client.id){
            log.warning(`User ${client.id} is not in group ${this.id}`)
            return false
        }

        delete client.groups[this.id.toString()]
        delete this.__clients[client.id.toString()]
        log.info(`User ${client.id} removed frou group ${this.id}`)
        return true;
    }

    /**
     * Send message to group
     * @param {Client} fromClient Client, that send message
     * @param {string} message Message to send
     * @param {Number} width Width of space for groups
     */
    send(fromClient, message, width) {
        const grpName = `${this.name}]`  // + (new Array(width-this.name.length).fill(' ').join(''))
        const mess = `[${grpName}<${fromClient.name}>\t${message}`
        log.info(`Message "${mess.trim()}" will be sent to group ${this.id}`)

        for (let i of Object.keys(this.__clients))
            if (this.__clients[i].id !== fromClient.id)
                this.__clients[i].socket.write(mess)
    }
}