/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const now = () => {
    const now = new Date()
    //TODO replace with format string
    return `${now.getFullYear()}/${now.getMonth()}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
}

module.exports = {
    info(message){
        console.info(`${now()}\tINFO: ${message}`)
    },
    warning(message){
        console.warn(`${now()}\tWARN: ${message}`)
    },
    error(message){
        console.error(`${now() }\tERRO: ${message}`)
    },
}