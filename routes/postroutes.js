import express from 'express'
import Post from '../models/Post.js'
const router = express.Router()

//GET route
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('comments')
        res.json(posts)
    } catch (err) {
        res.status(500).send(err)
    }
})

//GET route
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments')
        if (!post) return res.status(494).json({ message: 'Post not found' })
        res.json(post)
    } catch (err) {
        res.status(500).send(err)
    }
})

//NEW POST
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        });
        await newPost.save()
        res.status(201).json(newPost)
    } catch (err) {
        res.status(500).send(err)
    }
})

//PATCH
router.patch('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body)
        if (!updatedPost) return res.status(494).json({ message: 'Post not found' })
        res.json(updatedPost)
    } catch (err) {
        res.status(500).send(err)
    }
})

//DELETE POST
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id)
        if (!deletedPost) return res.status(494).json({ message: 'Post not found' })
        res.json({ message: 'Post deleted successfully' })    
    } catch (err) {
        res.status(500).send(err)
    }
})

export default router;