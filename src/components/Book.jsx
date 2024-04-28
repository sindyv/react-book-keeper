import { useLoaderData } from "react-router"
import { Form, Link } from "react-router-dom"

function Book() {
	const { book } = useLoaderData()
	return (
		<div>
			<h2>{book.title}</h2>

			<img src={`${book.coverImagePath}`} width={100} height={150} />

			<div>
				<span>Author:</span>
				<span>{book.author.name}</span>
			</div>
			<div>
				<span>Publish date:</span>
				<span>{book.publishDate}</span>
			</div>
			<div>
				<span>Page count:</span>
				<span>{book.pageCount}</span>
			</div>
			<div>
				<span>Description:</span>

				<span>{book.description}</span>
			</div>
			<Link to={`/books/${book._id}/edit`}>Edit</Link>
			<Form action={`/books/${book._id}/delete`} method="post">
				<button type="submit">Delete</button>
			</Form>

			<Link to={`/authors/${book.author._id}`}>View author</Link>
		</div>
	)
}

export async function loader({ params }) {
	const id = params.id

	const book = await (
		await fetch(`http://localhost:3000/books/${id}`, {
			method: "GET",
		})
	).json()

	return { book }
}

export default Book
