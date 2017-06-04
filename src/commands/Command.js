/**
 * 04.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

module.exports = class Command {

    can(content){
        return false;
    }

    process(client, content){

    }

}