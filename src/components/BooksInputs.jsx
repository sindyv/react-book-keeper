import FilePondPluginFileEncode from "filepond-plugin-file-encode"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginImageResize from "filepond-plugin-image-resize"
import { FilePond, registerPlugin } from "react-filepond"
import { create, setOptions } from "filepond"
import "filepond/dist/filepond.min.css"
import { useState } from "react"

registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginFileEncode,
	FilePondPluginImageResize
)

setOptions({
	stylePanelAspectRatio: 150 / 100,
	imageResizeTargetWidth: 100,
	imageResizeTargetHeight: 150,
	allowFileEncode: true,
})

const input = document.querySelector('input[type="file"]')

// Create a FilePond instance
create(input, {
	// storeAsFile: true,
})

function BooksInputs({ authors = [], book = {} }) {
	const [inputs, setInputs] = useState({
		...book,
		publishDate: book?.publishDate ? book.publishDate.split("T")[0] : undefined,
	})
	function handleUpdateInputs(value, prop) {
		setInputs((prev) => {
			const object = { ...prev }
			object[prop] = value
			return object
		})
	}
	return (
		<>
			<div>
				<label>Title</label>
				<input
					type="text"
					name="title"
					value={inputs.title}
					onChange={(e) => handleUpdateInputs(e.target.value, "title")}
				/>
			</div>
			<div>
				<label>Author</label>
				<select
					name="author"
					value={inputs?.author?._id || ""}
					onChange={(e) => handleUpdateInputs(e.target.value, "author")}
				>
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
				<input
					type="date"
					name="publishDate"
					value={inputs.publishDate}
					onChange={(e) => handleUpdateInputs(e.target.value, "publishDate")}
				/>
			</div>
			<div>
				<label>Page Count</label>
				<input
					type="number"
					name="pageCount"
					min={1}
					value={inputs.pageCount}
					onChange={(e) => handleUpdateInputs(e.target.value, "pageCount")}
				/>
			</div>
			{book.hasOwnProperty("title") ? null : (
				<div>
					<label>Cover</label>
					<input type="file" name="cover" className="filepond" />
				</div>
			)}
			<div>
				<label>Description</label>
				<textarea
					name="description"
					onChange={(e) => handleUpdateInputs(e.target.value, "description")}
				>
					{inputs.description}
				</textarea>
			</div>
		</>
	)
}

export default BooksInputs
