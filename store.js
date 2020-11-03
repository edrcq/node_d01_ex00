const Store = require('./Store.class')

const store = {
    'resources': new Store('resources')
}

console.log(store)

module.exports = store