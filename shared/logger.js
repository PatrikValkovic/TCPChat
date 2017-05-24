/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

module.exports = {
    info(message){
        console.info(`${Date.now().toString()}\tINFO: ${message}`)
    },
    warning(message){
        console.warn(`${Date.now().toString()}\tWARN: ${message}`)
    },
    error(message){
        console.error(`${Date.now().toString()}\tERRO: ${message}`)
    },
}