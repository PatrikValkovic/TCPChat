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
        for(let g in groups)
            this.__groups.push(new Group(g))
    }

    getGroups(){
        return this.__groups.map((g)=>{
            return g.name
        })
    }
}