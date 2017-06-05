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
     * @returns {Object}
     */
    getGroupsNames() {
        return Object.assign({},this.__groups)
    }

    /**
     * Search group by name
     * @param {string} name Name of group to find
     * @returns {Group|null} Instance of Group, null if group does not exists
     */
    getGroupByName(name) {
        for (let i of Object.keys(this.__groups))
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
        if (!this.__groups.hasOwnProperty(index.toString())){
            log.warning(`Attempt to get group with index ${index}, maximum is ${this.__groups.length - 1}`)
            return null
        }
        return this.__groups[index.toString()]
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
                this.__groups[g.id.toString()] = g
                ret.push(g)
            }
            log.warning(`Attempt to create existing group ${i}`)
            ret.push(exists)
        }
        return ret
    }
}

module.exports = new GroupManager()