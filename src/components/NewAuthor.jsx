import { Form, Link, redirect, useRouteError } from "react-router-dom"
import AuthorInputs from "./AuthorInputs"

function NewAuthor() {
	// async function handleSubmitAuthor(e) {
	// 	e.preventDefault()

	// 	const form = e.target
	// 	const formData = new FormData(form)
	// 	const formJson = Object.fromEntries(formData.entries())
	// 	console.log(formJson)
	// 	try {
	// 		const result = await fetch("http://localhost:3000/authors/new", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ name: formJson.name }),
	// 		})
	// 		const resJson = await result.json()

	// 		if (!result.ok) {
	// 			throw new Error(result.message)
	// 		}
	// 		console.log(resJson)
	// 		return redirect(`/authors/view/${author}`)
	// 	} catch (error) {
	// 		// return redirect(`/authors`)
	// 	}
	// }
	const error = useRouteError()

	return (
		<>
			<h2>New Author</h2>
			{error ? error.message : null}
			<Form method="post">
				<AuthorInputs />
				<Link to={"/authors"}>Cancel</Link>
				<button type="submit">Create</button>
			</Form>
		</>
	)
}

export async function action({ request, params }) {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	const author = data.name

	const result = await fetch("http://localhost:3000/authors/new", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: author }),
	})
	const resJson = await result.json()

	console.log(result)
	if (!result.ok) {
		throw new Error(resJson.message || "Oh Noes!")
	}

	return redirect(`/authors/${author}`)
}

export default NewAuthor
