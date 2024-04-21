function BooksInputs({ authors = [] }) {
	return (
		<>
			<div>
				<label>Title</label>
				<input type="text" name="title" />
			</div>
			<div>
				<label>Author</label>
				<select name="author">
					{authors.map((author) => (
						<option
							label={author.name}
							value={author._id}
							key={author._id}
						></option>
					))}
				</select>
			</div>
			<div>
				<label>Publish Date</label>
				<input type="date" name="publishDate" />
			</div>
			<div>
				<label>Page Count</label>
				<input type="number" name="pageCount" min={1} />
			</div>
			<div>
				<label>Cover</label>
				<input type="file" name="cover" />
			</div>
			<div>
				<label>Description</label>
				<textarea name="description"></textarea>
			</div>
		</>
	)
}

export default BooksInputs
