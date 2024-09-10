const express = require('express')
const { register,login, getUserinfo } = require('../Controllers/auth')

const router =  express.Router()

//1.Route for register and login.

router.post('/register',register)
router.post('/login',login)
router.get('/userinfo',getUserinfo)

module.exports = router