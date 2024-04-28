import { redirect } from "react-router"

export async function action({ params }) {
	try {
		const result = await fetch(`http://localhost:3000/books/${params.id}`, {
			method: "DELETE",
		})
	} catch (error) {}

	return redirect("/books")
}
