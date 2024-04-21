import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Author, { loader as authorLoader } from "./components/Author.jsx"

import ErrorPage from "./components/ErrorPage.jsx"
import NewAuthor, {
	action as newAuthorAction,
} from "./components/NewAuthor.jsx"
import Authors, { loader as authorsLoader } from "./components/Authors.jsx"
import Books, { loader as booksLoader } from "./components/Books.jsx"
import NewBook, {
	loader as newBookLoader,
	action as newBookAction,
} from "./components/NewBook.jsx"
import NewBookError from "./components/NewBookError.jsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		loader: booksLoader,
		children: [
			{
				path: "authors",
				element: <Authors />,
				loader: authorsLoader,
			},
			{
				path: "authors/:name",
				element: <Authors />,
				loader: authorsLoader,
			},

			{
				path: "authors/add",
				element: <NewAuthor />,
				errorElement: <NewAuthor />,
				action: newAuthorAction,
			},
			{
				path: "authors/view/:authorId",
				element: <Author />,
				loader: authorLoader,
			},
			{
				path: "books",
				element: <Books />,
				loader: booksLoader,
			},
			{
				path: "books/view/:bookId",
				element: <Books />,
				// loader: authorsLoader,
			},
			{
				path: "books/add",
				element: <NewBook />,
				errorElement: <NewBookError />,
				loader: newBookLoader,
				action: newBookAction,
			},
		],
	},
	,
])

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
