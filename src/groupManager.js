/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const util = require('util')
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
        this.width = 0
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
        log.warning(`Attempt to access ${name} group that doesn't exist`)
        return null
    }

    /**
     * Search group by index
     * @param {int} index Short index of group
     * @returns {Group|null} Instance of Group, null if group does not exists
     */
    getGroupByIndex(index) {
        if (!this.__groups.hasOwnProperty(index.toString())){
            log.warning(`Attempt to get group with index ${index} that doesn't exist`)
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
        if( typeof group === 'string')
            group = [group]

        /** @var {Group[]} */
        const ret = []

        for (const i of group){
            log.info(`Attemp to create group ${i}`)
            const exists = this.getGroupByName(i)
            if (exists === null) {
                const g = new Group(i, this.__groups.length)
                log.info(`Group ${i} created`)
                this.__groups[g.id.toString()] = g
                ret.push(g)
                continue
            }
            log.warning(`Attempt to create existing group ${i}`)
            ret.push(exists)
        }

        this.width = ret.map(g => g.name.length).reduce((l,r)=>{
            return Math.max(l,r) //TODO why direct usage if Math.max does not work?
        },this.width)

        return ret
    }
}

module.exports = new GroupManager()