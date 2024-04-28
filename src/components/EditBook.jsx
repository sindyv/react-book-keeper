import { useLoaderData, redirect } from "react-router"
import { Form, Link } from "react-router-dom"
import BooksInputs from "./BooksInputs"

function EditBook() {
	const { book, authors } = useLoaderData()
	return (
		<div>
			<h2>{book.title}</h2>
			<Form method="post">
				<BooksInputs book={book} authors={authors} />

				<Link to={"/books"}>Cancel</Link>
				<button type="submit">Save!</button>
			</Form>
		</div>
	)
}

export async function loader({ params }) {
	const id = params.id

	const result = await fetch(`http://localhost:3000/authors`, {
		method: "GET",
	})

	const book = await (
		await fetch(`http://localhost:3000/books/${id}`, {
			method: "GET",
		})
	).json()

	const resData = await result.json()
	const authors = resData?.authors || []

	return { book, authors }
}

export async function action({ request, params }) {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	const book = { ...data }

	const result = await fetch(`http://localhost:3000/books/${params.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ book }),
	})
	const resJson = await result.json()

	console.log(resJson)
	if (!result.ok) {
		throw new Error(resJson.message || "Oh Noes!")
	}

	return redirect(`/books`)
}

export default EditBook
