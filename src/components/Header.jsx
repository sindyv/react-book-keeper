import { Link } from "react-router-dom"

import styles from "./Header.module.css"

function Header() {
	return (
		<header className={styles.container}>
			<nav>
				<Link to={"/"}>React-book-keeper</Link>
				<ul>
					<li>
						<Link to={`authors/`}>Authors</Link>
					</li>
					<li>
						<Link to={`authors/add`}>Add Author</Link>
					</li>
					<li>
						<Link to={`books/`}>Search Books</Link>
					</li>
					<li>
						<Link to={`books/add`}>Add Book</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
