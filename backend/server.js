if (process.env.NODE_ENV !== "production") {
	require("dotenv").config()
}

const express = require("express")
const app = express()

const indexRouter = require("./routes/index")

app.use(express.static("public"))
app.use("/", indexRouter)

const mongoose = require("mongoose")
main().catch((err) => console.log(err))

async function main() {
	await mongoose.connect(process.env.DATABASE_URL)
}

app.listen(process.env.PORT || 3000)
