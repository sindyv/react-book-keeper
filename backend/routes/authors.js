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

// Edit authors
router.get("/:id", async (req, res) => {
	try {
		const author = await Author.findById(req.params.id)
		res.status(200).json(author)
	} catch (error) {
		res
			.status(404)
			.json({ message: "Could not find an author with that ID :(" })
	}
})

router.get("/:id/edit", async (req, res) => {
	res.status(200).json("Edit author" + req.params.id)
})

router.put("/:id", async (req, res) => {
	let author = {}
	try {
		author = await Author.findById(req.body.author._id)
		author.name = req.body.author.name
		await author.save()
		res.status(201).json({ author })
	} catch (error) {
		res.status(500).json({ message: "There was an error updating Author" })
	}
})

router.delete("/:id", async (req, res) => {
	try {
		author = await Author.deleteOne({ _id: req.params.id })

		res.status(201).json({ message: "Author successfully removed" })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "There was an error deleting Author" })
	}
})

module.exports = router
