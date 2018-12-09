/**
 * 05.06.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

module.exports = 'HELP\n' +
    '/setname\t\t\tSet your name\n' +
    '/groups\t\t\t\tList of all groups\n' +
    '/joined\t\t\t\tList of groups, that you are joined in\n' +
    '/join <groupName|groupId>\tJoin group\n' +
    '/leave <groupName|groupId>\tLeave group\n' +
    '/create <groupname>\t\tCreate new group\n' +
    '/<groupId> <message>\t\tSend message into group\n' +
    '/exit\t\t\t\tExit application\n' +
    '/history\t\t\tGet messages in your current channel\n'
