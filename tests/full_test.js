const axios = require('axios')

const test_resource = {
    "name": "Incredible resource 1.0.0",
    "isitreal": false
}

async function test_create(resource) {
    try {
        const res = await axios.post('http://localhost:4021/resource', resource)
        return res.data
    }
    catch (err) {
        return false
    }
}

async function test_get(id) {
    try {
        const res = await axios.get(`http://localhost:4021/resource/${id}`)
        return res.data
    }
    catch (err) {
        return false
    }
}

async function test_update(id, resource) {
    try {
        const res = await axios.put(`http://localhost:4021/resource/${id}`, resource)
        return res.data
    }
    catch (err) {
        return false
    }
}

async function test_patch(id, resource) {
    try {
        const res = await axios.patch(`http://localhost:4021/resource/${id}`, resource)
        return res.data
    }
    catch (err) {
        return false
    }
}

async function test_remove(id) {
    try {
        const res = await axios.delete(`http://localhost:4021/resource${id}`)
        return res.data
    }
    catch (err) {
        return false
    }
}

async function full_tests() {
    const create_result = await test_create(test_resource)
    console.log({ create_result })

    const get_result = await test_get(create_result.id)
    console.log({ get_result })

    const update_result = await test_patch(create_result.id, {
        name: 'WuW'
    })
    console.log({ update_result })

    const get__updated_result = await test_get(create_result.id)
    console.log({ get__updated_result })
}

full_tests()
    .then(() => {
        console.log("Tests finished")
    })

