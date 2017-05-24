/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

module.exports = class Client{
    constructor(socket,id){
        this.id = id
        this.socket = socket
        this.name = 'anonymous'
        this.connected = true
    }

    disconnect(){
        this.connected = false
    }
}