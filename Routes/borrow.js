const express = require('express')
const { getAllBooks,getBook,createBook,updateBook,deleteBook, getBooktype, getPublisher, getAuthor, getBookDetail, setBooktype, setAuthor, setPublisher } = require('../Controllers/book')
const { auth,checkAdmin} = require('../Middleware/auth')
const { getBorrow, setBorrow } = require('../Controllers/borrow')

const router =  express.Router()

// จัดการหนังสือ

router.get('/borrow',getBorrow)
router.post('/borrow',setBorrow)

module.exports = router