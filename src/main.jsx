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
import EditAuthor, {
	loader as editAuthorLoader,
	action as editAuthorAction,
} from "./components/EditAuthor.jsx"
import { action as deleteAuthorAction } from "./components/DeleteAuthor.jsx"
import Book, { loader as bookLoader } from "./components/Book.jsx"
import EditBook, {
	loader as editBookLoader,
	action as editBookAction,
} from "./components/EditBook.jsx"

import { action as deleteBookAction } from "./components/DeleteBook.jsx"

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
				path: "authors/:id",
				element: <Author />,
				loader: authorLoader,
			},

			{
				path: "authors/add",
				element: <NewAuthor />,
				errorElement: <NewAuthor />,
				action: newAuthorAction,
			},
			{
				path: "authors/:id/edit",
				element: <EditAuthor />,
				loader: editAuthorLoader,
				action: editAuthorAction,
			},
			{
				path: "authors/:id/delete",
				element: <></>,
				action: deleteAuthorAction,
				errorElement: <p>Ooops, there was an error deleting the author..</p>,
			},
			{
				path: "books",
				element: <Books />,
				loader: booksLoader,
			},
			{
				path: "books/:id",
				element: <Book />,
				loader: bookLoader,
			},
			{
				path: "books/:id/edit",
				element: <EditBook />,
				loader: editBookLoader,
				action: editBookAction,
			},
			{
				path: "books/:id/delete",
				element: <></>,
				action: deleteBookAction,
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
