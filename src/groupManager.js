/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Group = require('./Group')
const log = require('./logger')

/**
 * GroupManager manages chat groups
 * @type {GroupManager}
 */
class GroupManager {

    /**
     * Constructor
     */
    constructor() {
        this.__groups = {}
    }

    /**
     * Return array of chat group names
     * @returns {Array}
     */
    getGroupsNames() {
        return this.__groups.map((g) => {
            return g.name
        })
    }

    /**
     * Search group by name
     * @param {string} name Name of group to find
     * @returns {Group|null} Instance of Group, null if group does not exists
     */
    getGroupByName(name) {
        for (let i in this.__groups)
            if (this.__groups[i].name === name)
                return this.__groups[i]
        log.warning(`Attempt to access ${name} group`)
        return null
    }

    /**
     * Search group by index
     * @param {int} index Short index of group
     * @returns {Group|null} Instance of Group, null if group does not exists
     */
    getGroupByIndex(index) {
        if (index >= 0 && index < this.__groups.length)
            return this.__groups[index]
        log.warning(`Attempt to get group with index ${index}, maximum is ${this.__groups.length - 1}`)
        return null
    }

    /**
     * Create new chat group
     * @param {string|Array} group Name of new chat group
     * @returns {Array} Returns created group, if created.
     * In case that group with same name already exists, return existing instance of Group.
     */
    createGroup(group) {
        if(group instanceof String)
            group = [group]

        const ret = []

        for (const i of group){
            const exists = this.getGroupByName(i)
            if (exists === null) {
                const g = new Group(i, this.__groups.length)
                this.__groups.push(g)
                ret.push(g)
            }
            log.warning(`Attempt to create existing group ${i}`)
            ret.push(exists)
        }
        return ret
    }
}

module.exports = new GroupManager()