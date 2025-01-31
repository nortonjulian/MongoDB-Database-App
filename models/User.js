import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateJoined: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema)

module.exports = User;