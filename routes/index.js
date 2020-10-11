const express = require('express')
const router = express.Router()
const index = require('../controllers/indexController')
const { verify } = require('../middleware/verification')

router.get('/', index.welcome)
router.get('/login', index.login)
router.get('/register', index.register)
router.get('/test', index.registersuccess)
router.get('/dashboard', verify, index.dashboard)

module.exports = router
