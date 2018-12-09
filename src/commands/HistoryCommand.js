/**
 * Created by Patrik Valkovic
 * 09.12.2018.
 */

'use strict'

const Command = require('./Command')

class HistoryCommand extends Command {

    constructor(groupManager) {
        super();
        this.groupManager = groupManager;
    }

    can(content){
        return content.startsWith('/history')
    }

    process(client, content){
        if(client.lastGroup === null) {
            client.socket.write('You aren\'t in the group\n')
            return false
        }

        client.lastGroup.history(client, this.groupManager.width)
    }

}

module.exports = HistoryCommand
