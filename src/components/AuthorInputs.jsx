import { useState } from "react"

function AuthorInputs({ author = { name: "" } }) {
	const [name, setName] = useState(author.name)

	return (
		<>
			<label>Name</label>
			<input
				type="text"
				name="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
		</>
	)
}

export default AuthorInputs
