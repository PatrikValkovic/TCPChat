/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

let counter = 0

/**
 * Represent connected client
 * @type {Client}
 */
module.exports = class Client {
    constructor(socket) {
        this.socket = socket
        this.name = 'anonymous'
        this.id = counter++
        this.groups = {}
    }

    /**
     * Disconnect client from server
     */
    disconnect() {
        this.socket.destroy()
    }

    /**
     * Check, if is user in specific group
     * @param {string} name Name of group to check
     * @returns {boolean} True if is user in group, false otherwise
     */
    isInGroup(name) {
        for(const i of this.groups)
            if(this.groups[i].name === name)
                return true

        return false
    }

    joinedGroups(){
        return Object.assign({},this.groups)
    }
}