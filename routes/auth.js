const express = require('express')
const router = express.Router()
const auth = require('../controllers/authController')

router.get('/', auth.login)
router.get('/register', auth.register)

module.exports = router
