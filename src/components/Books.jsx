import { useState } from "react"
import { useLoaderData } from "react-router"
import { Form, Link } from "react-router-dom"

function Books() {
	// Retrieve data from loader function
	const data = useLoaderData()
	const books = [...data.books]
	const searchParams = { ...data.searchParams }

	// Handle inputs
	const [searchTitle, setSearchTitle] = useState(searchParams.title || "")
	const [searchPubBefore, setSearchPubBefore] = useState(
		searchParams.publishedBefore || ""
	)
	const [searchPubAfter, setSearchPubAfter] = useState(
		searchParams.publishedAfter || ""
	)

	return (
		<div>
			<h2>Search Books</h2>
			<Form role="search">
				<label>Title</label>
				<input
					type="text"
					name="title"
					value={searchTitle}
					onChange={(e) => setSearchTitle(e.target.value)}
				/>
				<label>Published after</label>
				<input
					type="date"
					name="publishedAfter"
					value={searchPubAfter}
					onChange={(e) => setSearchPubAfter(e.target.value)}
				/>
				<label>Published before</label>
				<input
					type="date"
					name="publishedBefore"
					value={searchPubBefore}
					onChange={(e) => setSearchPubBefore(e.target.value)}
				/>

				<button type="submit">Search</button>
			</Form>
			<br />
			<section>
				{books.map((book) => {
					return (
						<Link to={`/books/${book._id}`} key={book._id}>
							<img height={150} width={100} src={`${book.coverImagePath}`} />
						</Link>
					)
				})}
			</section>
		</div>
	)
}
export async function loader({ request }) {
	const url = new URL(request.url)

	// Converting key.value pairs to object.
	const searchParams = Object.fromEntries(url.searchParams.entries())

	// Extracting the search string form url to use against API.
	const searchString = url.searchParams.toString()

	const result = await fetch(`http://localhost:3000/books?${searchString}`, {
		// const result = await fetch(`http://localhost:3000/books`, {
		method: "GET",
	})
	const resData = await result.json()
	return { ...resData, searchParams }

	return null
}
export default Books
