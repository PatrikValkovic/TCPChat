/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Group = require('./Group')


module.exports = class GroupManager
{
    constructor(groups){
        this.__groups = []
        for(const i in groups)
            this.__groups.push(new Group(groups[i]))
    }

    getGroupsNames(){
        return this.__groups.map((g)=>{
            return g.name
        })
    }
}