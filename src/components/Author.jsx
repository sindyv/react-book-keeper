import { useLoaderData } from "react-router"
import { Form, Link } from "react-router-dom"

function Author() {
	const { author, books } = useLoaderData()

	return (
		<div>
			<h2>{author.name}</h2>
			<Link to={`/authors/${author._id}/edit`}>Edit</Link>
			<Form method="post" action={`/authors/${author._id}/delete`}>
				<button type="submit">Delete</button>
			</Form>
			<section>
				<h2>Books by author</h2>
				{books.map((book) => {
					if (book.author === author._id) {
						return (
							<img
								height={150}
								width={100}
								src={`${book.coverImagePath}`}
								key={book._id}
							/>
						)
					} else {
						return null
					}
				})}
			</section>
		</div>
	)
}

export async function loader({ params }) {
	const author = await (
		await fetch(`http://localhost:3000/authors/${params.id}`, {
			method: "GET",
		})
	).json()
	const books = await (
		await fetch(`http://localhost:3000/books/booksByAuthor/${author["_id"]}`, {
			method: "GET",
		})
	).json()

	return { author, books: books }
}
export default Author
