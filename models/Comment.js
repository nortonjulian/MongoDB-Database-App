import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    author: {
        type: 'String',
        ref: 'User',
        required: true
    },
    dateCommented: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment;