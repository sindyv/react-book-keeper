import { useLoaderData } from "react-router"

function Home() {
	const data = useLoaderData()
	const books = [...data.books]
	return (
		<div>
			<h2>Recently added</h2>
			<section>
				{books.map((book) => {
					return (
						<img
							height={150}
							width={100}
							src={`${book.coverImagePath}`}
							key={book._id}
						/>
					)
				})}
			</section>
		</div>
	)
}

export default Home
