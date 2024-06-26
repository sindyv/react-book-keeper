import { Form, useLoaderData, Link } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { getAuthors } from "../API"
import { useState } from "react"

function Authors() {
	const { resData } = useLoaderData()
	const [search, setSearch] = useState(resData?.searchOptions || "")

	function handleDeleteAuthor(e) {
		// if (!confirm("Please confirm you want to delete this record")) {
		// 	e.preventDefault()
		// }
	}

	return (
		<div>
			<h2>Search Authors</h2>
			<form role="search">
				<label>Name</label>
				<input
					type="text"
					name="name"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<button type="submit">Search</button>
			</form>
			<br />
			<section>
				{resData.authors.map((author) => (
					<div key={author._id}>
						{author.name}
						<Link to={`/authors/${author._id}`}>View</Link>
						<Link to={`/authors/${author._id}/edit`}>Edit</Link>
						<Form
							method="post"
							action={`${author._id}/delete`}
							onSubmit={handleDeleteAuthor}
						>
							<button type="submit">Delete</button>
						</Form>
					</div>
				))}
			</section>
		</div>
	)
}

export async function loader({ request }) {
	// const authorId = params.authorId

	const url = new URL(request.url)
	const name = url.searchParams.get("name")
	let searchParams = ""

	if (name) {
		searchParams = `?name=${name}`
	}

	const result = await fetch(`http://localhost:3000/authors${searchParams}`, {
		method: "GET",
	})

	const resData = await result.json()
	const authors = resData?.authors || []

	return { resData }
}

export default Authors
