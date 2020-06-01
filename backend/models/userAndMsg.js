const mongoose = require('mongoose')

const userAndMsgSchema = new mongoose.Schema({
    user: {
        type: String
    },
    msg: {
        type: String
    }
})

module.exports = mongoose.model('Chat', userAndMsgSchema)
