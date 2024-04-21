import { useLoaderData, useRouteError, redirect } from "react-router"
import BooksInputs from "./BooksInputs"
import { Form, Link } from "react-router-dom"
import { getAuthors } from "../API"

function NewBook({ error }) {
	const { authors } = useLoaderData()
	console.log(authors)
	return (
		<>
			<h2>New Book</h2>
			{error ? error.message : null}
			<Form method="post" encType="multipart/form-data">
				<BooksInputs authors={authors} />
				<Link to={"/books"}>Cancel</Link>
				<button type="submit">Create</button>
			</Form>
		</>
	)
}

export async function action({ request, params }) {
	const formData = await request.formData()
	// const data = Object.fromEntries(formData)
	// console.log(data)
	console.log(formData)

	const result = await fetch("http://localhost:3000/books/new", {
		method: "POST",
		// headers: {
		// 	// "Content-Type": "application/json",
		// },
		body: formData,
	})
	const resJson = await result.json()

	console.log(result)
	if (!result.ok) {
		throw new Error(resJson.message || "Oh Noes!")
	}

	return redirect(`/books`)
}

export async function loader() {
	let authors = []

	try {
		const resData = await getAuthors()
		authors = [...resData?.authors] || []
	} catch (error) {
		throw new Error(error || "There was an error")
	}

	return { authors }
}

export default NewBook
