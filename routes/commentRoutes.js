import express from 'express'
import Comment from '../models/Comment.js'
import Post from '../models/Post.js'
const router = express.Router()

//GET route
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().populate('post')
        res.json(comments)
    } catch (err) {
        res.status(500).send(err)
    }
})

//GET route
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('post')
        if (!comment) return res.status(404).json({ message: 'Comment not found' })
    } catch (err) {
        res.status(500).send(err)
    }
})

//NEW POST
router.post('/', async (req, res) => {
    try {
        const newComment = new Comment({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        });

        const savedComment = await newComment.save();
        await Comment.findByIdAndUpdate(req.body.postId)
        res.status(201).json(savedComment)
    } catch (err) {
        res.status(500).send(err)
    }
})

//PATCH
router.patch('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body)
        res.json(updatedComment)
    } catch (err) {
        res.status(500).send(err)
    }
})

//DELETE 
router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id)
        if (!deletedComment) return res.status(494).json({ message: 'Comment not found' })
            
        await Post.findByIdAndUpdate(deletedComment.post)    

        res.json({ message: 'Post deleted successfully' })    
    } catch (err) {
        res.status(500).send(err)
    }
})

export default router;