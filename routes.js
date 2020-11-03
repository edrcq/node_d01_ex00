const { Router } = require('express')
const router = Router()
const store = require('./store')

// GET ONE
router.get('/resource/:id', (req, res) => {
    // const id = req.params.id
    const { params: { id }} = req
    const resource = store.resources[id]

    res.json({
        resource
    })
})

// CREATE
router.post('/resource', (req, res) => {
    console.log(req.body)
    res.json({})
})

// UPDATE
router.put('/resource/:id', (req, res) => {
    console.log(req.body)
    res.json({})
})

// DELETE
router.delete('/resource/:id', (req, res) => {
    
    res.json({})
})



module.exports = router
