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
				<input type="file" name="cover" className="filepond" />
			</div>
			<div>
				<label>Description</label>
				<textarea name="description"></textarea>
			</div>
		</>
	)
}

export default BooksInputs
