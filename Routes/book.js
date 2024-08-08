const express = require('express')
const { getAllBooks,getBook,createBook,updateBook,deleteBook } = require('../Controllers/book')

const router =  express.Router()

//1.Route for register and login.

router.get('/book',getAllBooks)
router.get('/book/:id',getBook)
router.post('/addbook',createBook)
router.put('/updatebook/:id',updateBook)
router.delete('/deletebook/:id',deleteBook)

module.exports = router