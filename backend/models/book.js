const mongoose = require("mongoose")
const path = require("path")
const coverImageBasePath = "uploads/bookCovers"

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		descrition: {
			type: String,
		},
		publishDate: {
			type: Date,
			required: true,
		},
		pageCount: {
			type: Number,
			required: true,
		},
		createdAt: {
			type: Date,
			required: true,
			default: Date.now(),
		},
		coverImageName: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Author",
		},
	},
	{
		toJSON: true,
		toObject: true,
	}
)

// Render virtual properties when quering data.
bookSchema.set("toJSON", { virtuals: true })

// Virtual properties
bookSchema.virtual("coverImagePath").get(function () {
	if (this.coverImageName != null) {
		return path.join("/", coverImageBasePath, this.coverImageName)
	}
})

module.exports = mongoose.model("Book", bookSchema)
module.exports.coverImageBasePath = coverImageBasePath
