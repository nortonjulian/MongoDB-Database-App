import express from 'express'
import mongoose from 'mongoose'
// const bodyParser = require('bodyParser')

import commentRoutes from './routes/commentRoutes.js' 
import postRoutes from './routes/postroutes.js' 
import userRoutes from './routes/userRoutes.js'

import 'dotenv/config'

const app = express();
const port = 8080;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('MongoDB connection error:', err))

app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)
app.use('/users', userRoutes)

app.get('/', async (req, res) => {
    res.send('Hello from server')
})

app.listen(port, () => {
    console.log(`Server id running on ${port}`)
})

