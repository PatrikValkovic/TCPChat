/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

let counter = 0

module.exports = class Client{
    constructor(socket,id){
        this.id = id
        this.socket = socket
        this.name = 'anonymous'
        this.connected = true
        this.id = counter++
        this.groups = {}
    }

    disconnect(){
        this.connected = false
    }

    isInGroup(name){
        return this.groups.hasOwnProperty(name)
    }
}