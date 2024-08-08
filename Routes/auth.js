const express = require('express')
const { register,login } = require('../Controllers/auth')

const router =  express.Router()

//1.Route for register and login.

router.post('/register',register)
router.post('/login',login)

module.exports = router