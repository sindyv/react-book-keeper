import React from "react"
import { useLoaderData } from "react-router"

import AuthorInputs from "./AuthorInputs"
import { Form, Link, redirect } from "react-router-dom"

function EditAuthor() {
	const { resData: data } = useLoaderData()
	return (
		<div>
			<div>
				Edit Author with ID of {data._id} and name of {data.name}
			</div>
			<div>
				<Form method="post">
					<AuthorInputs author={data} />
					<Link to={"/authors"}>Cancel</Link>
					<button type="submit">Save</button>
				</Form>
			</div>
		</div>
	)
}

export async function loader({ params }) {
	const result = await fetch(`http://localhost:3000/authors/${params.id}`, {
		method: "GET",
	})

	const resData = await result.json()

	return { resData }
}

export async function action({ request, params }) {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	const author = { name: data.name, _id: params.id }

	const result = await fetch(`http://localhost:3000/authors/${params.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ author }),
	})
	const resJson = await result.json()

	console.log(resJson)
	if (!result.ok) {
		throw new Error(resJson.message || "Oh Noes!")
	}

	return redirect(`/authors`)
}

export default EditAuthor
