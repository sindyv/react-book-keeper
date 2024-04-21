export async function getAuthors(searchOptions = {}) {
	const response = await fetch("http://localhost:3000/authors")
	const resData = await response.json()

	if (!response.ok) {
		throw new Error(resData.message || "Failed to fetch authors")
	}

	return resData
}
