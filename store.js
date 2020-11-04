const process = require('process')
const { Store } = require('./Store.class')

const store = {
    'resources': new Store('resources', { path: `${__dirname}/data/resources.json`}),
}


function exitSaveStore() {
    console.log('save before exit !')
    const saved = []
    for (let name in store) {
        saved.push(store[name].save())
    }
    Promise.all(saved).then(r => {
        process.exit(0)
    })
}

process.on('exit', exitSaveStore)




module.exports = store