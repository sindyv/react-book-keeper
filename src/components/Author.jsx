import { useLoaderData } from "react-router"

function Author() {
	const { authorId } = useLoaderData()
	return <div>This is the author: {authorId}</div>
}

export function loader({ params }) {
	const authorId = params.authorId
	return { authorId }
}

export default Author
