import express from 'express'
import User from '../models/User.js'
const router = express.Router()

//GET route
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).send(err)
    }
})

//POST route
router.post('/', async (req, res) => {
    const { username, email } = req.body;
    const newUser = new User({ username, email })
    try {
        await newUser.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).send(err)
    }
})

//PATCH
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        res.json(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(204).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

export default router;