const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

class Store {

    constructor(name, options = {}) {
        this.name = name || ''
        this.path = options.path || undefined;
        this.content = {}
        this.interval = undefined;

        this.autoLoad()
        this.autoSave()
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

    autoLoad() {
        if (!this.path) { return; }
        fs.readFile(this.path, (err, data) => {
            if (!err)
                this.content = JSON.parse(data.toString('utf-8'))
            else
                console.error('CANNOT READ', this.path)
        })
    }

    autoSave() {
        if (!this.path) { return; }
        this.interval = setInterval(() => {
            this.save()
        }, 5000)
    }

    save() {
        if (!this.path) { return Promise.resolve(false); }
        return new Promise((resolve, reject) => {
            fs.writeFile(this.path, JSON.stringify(this.content), (err) => {
                if (err) {
                    return reject(err)
                }
                resolve(true)
            })
        })
    }
}

exports.Store = Store