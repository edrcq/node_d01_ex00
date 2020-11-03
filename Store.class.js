const { v4: uuidv4 } = require('uuid');

class Store {

    constructor(name, { path } = {}) {
        this.name = name || ''
        this.path = path || undefined;
        this.content = {}
    }

    getById(id) {
        return this.content[id]
    }

    add(resource) {
        resource.id = uuidv4()
        this.content[resource.id] = resource
        return resource
    }

    remove(id) {
        if (this.content[id]) {
            delete this.content[id]
            return true
        }
        return false
    }

    replace(id, resource) {
        if (this.content[id]) {
            resource.id = id
            this.content[id] = resource
            return true
        }
        return false
    }

    patch(id, resource) {
        if (this.content[id]) {
            const base_resource = this.content[id]
            resource.id = id
            this.content[id] = { ...base_resource, ...resource }
            return this.content[id]
        }
        return false
    }


}

module.exports = Store