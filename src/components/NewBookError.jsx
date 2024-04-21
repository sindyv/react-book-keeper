import { useRouteError } from "react-router"
import { Link } from "react-router-dom"

function NewBookError() {
	const error = useRouteError()
	console.error(error)
	return (
		<div>
			There was an error creating the book!
			<Link to={"/books/add"}>Go Back!</Link>
		</div>
	)
}

export default NewBookError
