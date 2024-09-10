const express = require('express')
const { getAllBooks,getBook,createBook,updateBook,deleteBook, getBooktype, getPublisher, getAuthor, getBookDetail, setBooktype, setAuthor, setPublisher } = require('../Controllers/book')
const { auth,checkAdmin} = require('../Middleware/auth')

const router =  express.Router()

// จัดการหนังสือ

router.get('/books',auth,getAllBooks)
router.get('/book/:id',auth,getBook)
router.get('/bookdetail/:id',auth,getBookDetail)
router.post('/book',checkAdmin,createBook)
router.put('/book/:id',checkAdmin,updateBook)
router.delete('/book/:id',checkAdmin,deleteBook)

// จัดการ ประเภทหนังสือ
router.get('/booktype',auth,getBooktype)
router.post('/booktype',checkAdmin,setBooktype)

// จัดการ ผู้แต่ง
router.get('/author',auth,getAuthor)
router.post('/author',checkAdmin,setAuthor)

// จัดการ สำนักพิมพ์
router.get('/publisher',auth,getPublisher)
router.post('/publisher',checkAdmin,setPublisher)

module.exports = router