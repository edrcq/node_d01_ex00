const { Store } = require('./Store.class')

const store = {
    'resources': new Store('resources', { path: `${__dirname}/data/resources.json`}),
}

console.log(store)

module.exports = store