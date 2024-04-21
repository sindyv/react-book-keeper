const express = require("express")
const router = express.Router()

const Book = require("../models/book")
const path = require("path")

const fs = require("fs")

const multer = require("multer")
const uploadPath = path.join("public", Book.coverImageBasePath)
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"]
const upload = multer({
	dest: uploadPath,
	fileFilter: (req, file, cb) => {
		cb(null, imageMimeTypes.includes(file.mimetype))
	},
})

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
		console.log(req.query)

		// return books and searchOptions used to find current books.
		res.status(200).json({ books, searchOptions: req.query })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Error fetching authors from database!" })
	}
})

// Create book route
router.post("/new", upload.single("cover"), async (req, res) => {
	const fileName = req.file != null ? req.file.filename : null

	const book = new Book({
		title: req.body.title,
		author: req.body.author,
		publishDate: new Date(req.body.publishDate),
		pageCount: req.body.pageCount,
		coverImageName: fileName,
		description: req.body.description,
	})

	try {
		const newBook = await book.save()
		res.status(201).json(newBook)
	} catch (error) {
		if (book.coverImageName != null) {
			removeBookCover(book.coverImageName)
		}
		res.status(500).json({ message: "There was an error creating Book" })
	}
})

function removeBookCover(fileName) {
	fs.unlink(path.join(uploadPath, fileName), (err) => {
		if (err) {
			console.error(err)
		}
	})
}

module.exports = router
