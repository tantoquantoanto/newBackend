const express = require('express')
const BooksModel = require('../BooksModels')
const books = express.Router()


books.get('/books', async (request, response) => {
    try {
        const books = await BooksModel.find()
        if (books.length === 0) {
            return response
                .status(404)
                .send({
                    message: 'No books found'
                })
        }
        response
            .status(200)
            .send({
                statusCode: 200,
                books
            })
    } catch (e) {
        response
            .status(500)
            .send({
                message: e.message
            })
    }
})


books.get('/book/:bookId', async (request, response) => {
    const { bookId } = request.params
    try {
        const book = await BooksModel.findById(bookId)

        if (!book) {
            return response
                .status(404)
                .send({
                    statusCode: 404,
                    message: `No books found with the given ID: ${bookId}`
                })
        }

        response
            .status(200)
            .send(book)
    } catch (e) {
        response
            .status(500)
            .send({
                message: e.message
            })
    }
})


books.post('/books/create', async (request, response) => {
    const newBook = new BooksModel({
        asin: request.body.asin,
        price: request.body.price,
        img: request.body.img,
        category: request.body.category,
        title: request.body.title
    })


    try {
        const savedBook = await newBook.save()
        response
            .status(201)
            .send({
                statusCode: 201,
                message: 'Book saved successfully',
                savedBook
            })
    } catch (e) {
        response
            .status(500)
            .send({
                message: e.message
            })
    }
})


books.patch('/books/update/:bookId', async (request, response) => {
    const { bookId } = request.params
    const bookExist = await BooksModel.findById(bookId)

    if (!bookExist) {
        return response
            .status(400)
            .send({
                statusCode: 400,
                message: 'No books found with the given bookId'
            })
    }

    try {
        const updatedBookData = request.body
        const options = { new: true }

        const result = await BooksModel.findByIdAndUpdate(bookId, updatedBookData, options)

        response
            .status(200)
            .send(result)
    } catch (e) {
        response
            .status(500)
            .send({
                message: e.message
            })
    }
})


module.exports = books
