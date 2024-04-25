const mongoose = require("mongoose")
const Book = require("./book")

const authorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
})

authorSchema.pre("deleteOne", async function (next) {
	try {
		const query = this.getFilter()

		const books = await Book.find({ author: query._id })
		if (books.length === 0) {
			return next()
		} else {
			next(new Error("This author still has books"))
		}
	} catch (error) {
		next(error)
	}
})

module.exports = mongoose.model("Author", authorSchema)
