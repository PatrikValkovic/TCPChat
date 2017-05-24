/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Group = require('./Group')
const log = require('../shared/logger')


module.exports = class GroupManager {
    constructor(groups) {
        this.__groups = []
        for (const i in groups)
            this.__groups.push(new Group(groups[i], this.__groups.length))
    }

    getGroupsNames() {
        return this.__groups.map((g) => {
            return g.name
        })
    }

    getGroupByName(name) {
        for (let i in this.__groups)
            if (this.__groups[i].name === name)
                return this.__groups[i]
        log.warning(`Attempt to access ${name} group`)
        return null
    }

    getGroupByIndex(index) {
        if (index >= 0 && index < this.__groups.length)
            return this.__groups[index]
        log.warning(`Attempt to get group with index ${index}, maximum is ${this.__groups.length - 1}`)
        return null
    }

    createGroup(groupName) {
        const exists = this.getGroupByName(groupName)
        if (exists === null) {
            const g = new Group(groupName, this.__groups.length)
            this.__groups.push(g)
            return g
        }
        log.warning(`Attempt to create existing group ${groupName}`)
        return exists
    }
}