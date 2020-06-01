const router = require('express').Router()
const User = require('../models/userAndMsg')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
})

router.post('/', async (req, res) => {
    const user = new User ({
        user: req.body.user,
        msg: req.body.msg
    })
    try {   
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch (err){
        res.status(400).json({message: err.message})
    }
})

router.patch('/:id', getUser, async (req, res) => {
    if(req.body.user != null)
            res.user.user = req.body.user
        
        if(req.body.msg != null)
            res.user.msg = req.body.msg
    try {
        const updateUser = await res.user.save()
        res.json(updateUser)
    }
    catch (err){
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.user.remove()
        res.json({message: 'Message deleted'})
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
})

async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id)
        if(user == null)
            return res.status(404).json({message: err.message})
        res.user = user
        next()
    }
    catch (err){
        return res.status(500).json({message: err.message})
    }

}

module.exports = router