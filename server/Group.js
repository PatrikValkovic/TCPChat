/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

module.exports = class Group
{
    constructor(name){
        this.name = name
        this.__clients = []
    }

    addClient(client){
        this.__clients.push(client)
    }
}