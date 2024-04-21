import { Outlet } from "react-router"
import "./App.css"
import Header from "./components/Header"
import Home from "./components/Home"

import styles from "./App.module.css"

function App() {
	return (
		<div className={styles.container}>
			<Header />
			<Home />
			<Outlet />
		</div>
	)
}

export default App
