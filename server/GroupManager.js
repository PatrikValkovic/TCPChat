/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const Group = require('./Group')
const log = require('../shared/logger')

/**
 * GroupManager manages chat groups
 * @type {GroupManager}
 */
module.exports = class GroupManager {

    /**
     * Constructor
     * @param {array} groups Array of groups, that should be created by default
     */
    constructor(groups) {
        this.__groups = []
        for (const i in groups)
            this.__groups.push(new Group(groups[i], this.__groups.length))
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
     * @param {string} groupName Name of new chat group
     * @returns {Group} Returns new group, if was group created.
     * In case that group with same name already exists, return existing instance of Group.
     */
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