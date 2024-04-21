const express = require("express")
const router = express.Router()
const Author = require("../models/author")

// All authors route
router.get("/", async (req, res) => {
	const searchOptions = {}
	if (req.query?.name ?? false) {
		if (req.query.name != null && req.query.name !== "") {
			searchOptions.name = new RegExp(req.query?.name, "i")
		}
	}

	try {
		const authors = await Author.find(searchOptions)
		res.status(200).json({ authors, searchOptions: req.query?.name })
	} catch (error) {
		res.status(500).json({ message: "Error fetching authors from database!" })
	}
})

// Create author route
router.post("/new", async (req, res) => {
	const author = new Author({
		name: req.body.name,
	})

	try {
		const newAuthor = await author.save()
		res.status(201).json(newAuthor)
	} catch (error) {
		res.status(500).json({ message: "There was an error creating Author" })
	}
})

module.exports = router
