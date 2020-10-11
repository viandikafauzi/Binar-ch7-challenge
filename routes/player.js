const express = require('express')
const router = express.Router()
const player = require('../controllers/playerController')

/* Player API */
router.get('/api', player.get)
router.get('/api/:id', player.getbyid)
router.post('/api/register', player.register)
router.post('/api/login', player.login)
router.put('/api/:id', player.put)
router.delete('/api/:id', player.delete)

module.exports = router
