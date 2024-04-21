import { useState, useEffect } from "react"

export function useFetch(fetchFn, fnOptions) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState()
	const [data, setData] = useState()

	useEffect(() => {
		setLoading(true)

		async function fetchData() {
			try {
				const result = await fetchFn(fnOptions)
				setData(result)
			} catch (error) {
				setError(error.message || "Something went wrong :(")
			}

			setLoading(false)
		}

		fetchData()
	}, [fetchFn])

	return { loading, error, data }
}
