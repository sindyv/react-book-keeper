const express = require("express")
const router = express.Router()

const Book = require("../models/book")
// const path = require("path")

const fs = require("fs")
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"]

// const multer = require("multer")
// const uploadPath = path.join("public", Book.coverImageBasePath)
// const upload = multer({
// 	dest: uploadPath,
// 	fileFilter: (req, file, cb) => {
// 		cb(null, imageMimeTypes.includes(file.mimetype))
// 	},
// })

// All books route
router.get("/", async (req, res) => {
	let query = Book.find()

	if (req.query.title != null && req.query.title != "") {
		// 'title' is refering to prop in Book model.
		query = query.regex("title", new RegExp(req.query.title, "i"))
	}

	if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
		// 'publishDate' is refering to prop in Book model.
		query = query.lte("publishDate", req.query.publishedBefore)
	}

	if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
		// 'publishDate' is refering to prop in Book model.
		query = query.gte("publishDate", req.query.publishedAfter)
	}

	try {
		// execute query
		const books = await query.limit(10).exec()

		// return books and searchOptions used to find current books.
		res.status(200).json({ books, searchOptions: req.query })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Error fetching authors from database!" })
	}
})

// Create book route
router.post("/new", async (req, res) => {
	const book = new Book({
		title: req.body.title,
		author: req.body.author,
		publishDate: new Date(req.body.publishDate),
		pageCount: req.body.pageCount,
		description: req.body.description,
	})

	saveCover(book, req.body.cover)

	try {
		const newBook = await book.save()
		res.status(201).json(newBook)
	} catch (error) {
		if (book.coverImageName != null) {
		}
		res.status(500).json({ message: "There was an error creating Book" })
	}
})

// Find books by author
router.get("/booksByAuthor/:author", async (req, res) => {
	try {
		const books = await Book.find({ author: req.params.author }).limit(6).exec()
		res.status(200).json(books)
	} catch (error) {
		res.status(500).json({ message: "There was an error finding books" })
	}
})

// Edit book
router.put("/:id", async (req, res) => {
	let book = {}
	try {
		book = await Book.findById(req.params.id)

		book.description = req.body.book.description
		book.publishDate = req.body.book.publishDate
		book.pageCount = req.body.book.pageCount
		book.author = req.body.book.author
		await book.save()

		res.status(201).json({ book })
	} catch (error) {
		res.status(500).json({ message: "There was an error updating Book" })
	}
})

router.get("/:id/edit", async (req, res) => {
	res.status(200).json("Edit author" + req.params.id)
})

// Find book by id
router.get("/:id", async (req, res) => {
	console.log(req.params)
	try {
		const book = await Book.findById({ _id: req.params.id })
			.populate("author")
			.exec()

		res.status(200).json(book)
	} catch (error) {
		res.status(500).json({ message: "There was an error finding books" })
	}
})

router.delete("/:id", async (req, res) => {
	try {
		book = await Book.deleteOne({ _id: req.params.id })

		res.status(201).json({ message: "Book successfully removed" })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "There was an error deleting Book" })
	}
})

function saveCover(book, coverEncoded) {
	if (coverEncoded == null) return

	// The Cover Image comes as a Base64 encoded JSON-object.
	const cover = JSON.parse(coverEncoded)
	if (cover != null && imageMimeTypes.includes(cover.type)) {
		// Create a Buffer datatype from the 'data'-property of the JSON-object.
		book.coverImage = new Buffer.from(cover.data, "base64")
		book.coverImageType = cover.type
	}
}

module.exports = router
