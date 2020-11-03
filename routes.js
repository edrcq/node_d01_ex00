const { Router } = require('express')
const router = Router()
const store = require('./store')

// GET ONE
router.get('/resource/:id', (req, res) => {
    // const id = req.params.id
    const { params: { id }} = req
    const resource = store.resources.getById(id)
    if (!resource) {
        return res.status(404).end()
    }
    res.json(resource)
})

// CREATE
router.post('/resource', (req, res) => {
    console.log(req.body)
    const resource = store.resources.add(req.body)
    res.json(resource)
})

// UPDATE - REPLACE
router.put('/resource/:id', (req, res) => {
    const { body, params: { id }} = req
    const success = store.resources.replace(id, body)
    if (!success) {
        return res.status(404).end()
    }
    res.json({ success })
})

// UPDATE - PATCH
router.patch('/resource/:id', (req, res) => {
    const { body, params: { id }} = req
    const resource = store.resources.patch(id, body)
    if (!resource) {
        return res.status(404).end()
    }
    res.json(resource)
})

// DELETE
router.delete('/resource/:id', (req, res) => {
    const { params: { id }} = req
    const success = store.resources.remove(id)
    if (!success) {
        return res.status(404).end()
    }
    res.json({ success })
})



module.exports = router
