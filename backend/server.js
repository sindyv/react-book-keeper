if (process.env.NODE_ENV !== "production") {
	require("dotenv").config()
}
const bodyParser = require("body-parser")
const express = require("express")
const app = express()

const indexRouter = require("./routes/index")
const authorRouter = require("./routes/authors")
const booksRouter = require("./routes/books")

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type")
	next()
})

app.use(bodyParser.json())
app.use(express.static("public"))
app.use("/", indexRouter)
app.use("/authors", authorRouter)
app.use("/books", booksRouter)

const mongoose = require("mongoose")
main().catch((err) => console.log(err))

async function main() {
	await mongoose.connect(process.env.DATABASE_URL)
}

app.listen(process.env.PORT || 3000)
