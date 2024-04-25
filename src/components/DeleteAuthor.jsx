import { redirect } from "react-router"

export async function action({ params }) {
	try {
		const result = await fetch(`http://localhost:3000/authors/${params.id}`, {
			method: "DELETE",
		})
	} catch (error) {}

	const resData = await result.json()
	console.log(resData)

	return redirect("/authors")
}
