const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const cors = require('cors')


const PORT = process.env.PORT || 5001
const MONGO_URI = 'mongodb+srv://randomPerson:randomPerson123@test-z7xg0.mongodb.net/test?retryWrites=true&w=majority'
const app = express()
const server = http.createServer(app)
app.use(express.json())
app.use(cors())

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    err => err ? console.log('Failed to connect to mongoDB') : console.log('MongoDB connected'))

const userAndMsgRoute = require('./routes/userAndMsg')
app.use('/user', userAndMsgRoute)

app.listen(PORT, console.log('Server connected to port', PORT))

