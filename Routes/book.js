const express = require('express')
const { getAllBooks,getBook,createBook,updateBook,deleteBook } = require('../Controllers/book')

const router =  express.Router()

//1.Route for register and login.

router.get('/books',getAllBooks)
router.get('/books/:id',getBook)
router.post('/books',createBook)
router.put('/books/:id',updateBook)
router.delete('/books/:id',deleteBook)

module.exports = router