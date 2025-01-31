import express from 'express'
import mongoose from 'mongoose'
// const bodyParser = require('bodyParser')

import 'dotenv/config'

const app = express();
const port = 8080;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.log('MongoDB connection error:', err)))


app.listen(port, () => {
    console.log(`Server id running on ${port}`)
})

