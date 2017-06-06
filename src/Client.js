/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const logger = require('./logger')

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
        this.lastGroup = null
        logger.info(`User with ID ${this.id} created`)
    }

    /**
     * Disconnect client from server
     */
    disconnect() {
        logger.info(`User ${this.name} with id ${this.id} disconnecteds`)
        for(const grp of Object.keys(this.groups))
            this.groups[grp].removeClient(this)
        
        this.socket.destroy()
    }

    /**
     * Check, if is user in specific group
     * @param {string} name Name of group to check
     * @returns {boolean} True if is user in group, false otherwise
     */
    isInGroup(name) {
        return this.groupByName(name) !== null
    }

    /**
     * Get all groups, that user is joined in
     * @returns {Object} Object, where key is ID of group
     */
    joinedGroups(){
        return Object.assign({},this.groups)
    }

    /**
     * Find group for user
     * @param {String} name Name of group to find
     * @returns {Group|null} Instance of group if user is in that group, null otherwise
     */
    groupByName(name){
        for(const i of Object.keys(this.groups))
            if(this.groups[i].name === name)
                return this.groups[i]

        logger.warning(`Cannot find group ${name} for user ${this.id}`)
        return null
    }

    /**
     * Find group for user
     * @param {Number} id ID of group
     * @returns {Group|null} Instance of group if user is in that group, null otherwise
     */
    groupById(id){
        return this.groups[id.toString()] || null
    }
}